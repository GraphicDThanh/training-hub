from celery import shared_task

from akismet import Akismet
from django.core.exceptions import ImproperlyConfigured
from django.contrib.sites.models import Site
from django.conf import settings

from social_api.post.models import Comment


@shared_task
def spam_filter(comment_id, remote_addr=None):
    logger = spam_filter.get_logger()
    logger.info('Running spam filter for comment %s', comment_id)

    comment = Comment.objects.get(pk=comment_id)
    current_domain = Site.objects.get_current().domain
    akismet = Akismet(
        settings.AKISMET_KEY,
        'http://{0}'.format(current_domain)
    )

    if not akismet.verify_key():
        raise ImproperlyConfigured('Invalid AKISMET_KEY')

    is_spam = akismet.comment_check(
        user_ip=remote_addr,
        comment_content=comment.content,
        comment_author=comment.owner.username
    )

    if is_spam:
        comment.is_spam = True
        comment.save()

    return comment

