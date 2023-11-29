# wishlist/utils.py

from .models import Wishlist

def delete_wishlist(wishlist_id, user):

    try:
        wishlist = Wishlist.objects.get(id=wishlist_id, user=user)
    except Wishlist.DoesNotExist:
        # 찜 데이터가 없으면 아무것도 안함
        return 

    wishlist.delete()