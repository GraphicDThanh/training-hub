#!/usr/bin/env python
import sys
import os
# Try on remote debug qith VSCode but still fail
# import ptvsd

# ptvsd.enable_attach(address=('0.0.0.0', 8000))
# ptvsd.wait_for_attach()

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
    os.environ.setdefault('DJANGO_CONFIGURATION', 'Local')

    try:
        from configurations.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Run test and coverage at one command `python manage.py test`
    # Fix issue https://github.com/django-nose/django-nose/issues/180
    is_testing = 'test' in sys.argv

    if is_testing:
        import coverage
        cov = coverage.coverage()
        cov.erase()
        cov.start()

    execute_from_command_line(sys.argv)

    if is_testing:
        cov.stop()
        cov.save()
        cov.report()
