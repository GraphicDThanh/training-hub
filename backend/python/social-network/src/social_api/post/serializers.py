from rest_framework import serializers

from social_api.core.models import Photo
from social_api.core.serializers import PhotoSerializer
from social_api.core.serializers import CustomModelSerializer
from social_api.category.models import Category
from social_api.user.serializers import UserProfileSerializer
from social_api.category.serializers import CategorySerializer

from .models import Post, Comment, Like


class PostSerializer(CustomModelSerializer):
    """Post serializer"""
    category = CategorySerializer(read_only=True)
    owner = UserProfileSerializer(read_only=True)
    photo = PhotoSerializer(read_only=True)
    total_comment = serializers.IntegerField(read_only=True)
    total_like = serializers.IntegerField(read_only=True)

    category_id = serializers.SlugRelatedField(
        queryset=Category.objects.all(),
        # queryset=Category.objects.all(),
        slug_field='id',
        write_only=True,
    )
    photo_id = serializers.PrimaryKeyRelatedField(
        queryset=Photo.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Post
        fields = '__all__'
        extra_fields = [
            # 'total_comment', 'total_like']
            'total_comment', 'total_like', 'category_id', 'photo_id']

    def to_internal_value(self, data):
        """Override to support deserializer, for write operations"""
        return {
            'title': data['title'],
            'category': Category.objects.get(pk=data['category_id']),
            'content': data['content'],
            'photo': Photo.objects.get(pk=data['photo_id'])
        }

    def create(self, validated_data):
        """Override create method of serializer"""
        if 'owner' not in validated_data:
            validated_data['owner'] = self.context['request'].user

        return super(PostSerializer, self).create(validated_data)


class CommentSerializer(CustomModelSerializer):
    """Comment serializer"""
    owner = UserProfileSerializer(read_only=True)
    photo = PhotoSerializer(read_only=True)
    post = PostSerializer(read_only=True)
    post_id = serializers.PrimaryKeyRelatedField(
        queryset=Post.objects.all(),
        write_only=True,
    )
    photo_id = serializers.PrimaryKeyRelatedField(
        queryset=Photo.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Comment
        fields = '__all__'
        extra_fields = ['post_id', 'photo_id']

    def to_internal_value(self, data):
        """Override to support deserializer, for write operations"""
        return {
            'content': data['content'],
            'photo': Photo.objects.get(pk=data['photo_id']),
            'post': Post.objects.get(pk=data['post_id']),
        }

    def create(self, validated_data):
        """Override create method of serializer"""
        if 'owner' not in validated_data:
            validated_data['owner'] = self.context['request'].user

        return super(CommentSerializer, self).create(validated_data)


class LikeSerializer(CustomModelSerializer):
    """Like serializer"""
    owner = UserProfileSerializer(read_only=True)
    post = PostSerializer(read_only=True)
    post_id = serializers.PrimaryKeyRelatedField(
        queryset=Post.objects.all(),
        write_only=True,
    )

    class Meta:
        model = Like
        fields = '__all__'
        extra_fields = ['post_id']

    def to_internal_value(self, data):
        """Override to support deserializer, for write operations"""
        is_like_str = data.get('is_like', False)
        if is_like_str == 'true':
            is_like = True
        else:
            is_like = False

        return {
            'is_like': is_like,
            'post': Post.objects.get(pk=data['post_id']),
        }

    def create(self, validated_data):
        """Override create method of serializer"""
        if 'owner' not in validated_data:
            validated_data['owner'] = self.context['request'].user

        return super(LikeSerializer, self).create(validated_data)
