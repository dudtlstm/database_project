from django.urls import path
from .views import PeopleListView, EventsByPersonView, SearchEventView, EventDetailView, SearchAllView

urlpatterns = [
    # 인물 리스트 조회
    path('people/', PeopleListView.as_view(), name='people-list'),
    
    # 특정 인물의 사건 리스트 조회
    path('people/<int:person_id>/events/', EventsByPersonView.as_view(), name='events-by-person'),
    
    # 특정 인물의 사건 검색 기능
    path('people/<int:person_id>/events/search/', SearchEventView.as_view(), name='search-events'),
    
    # 사건 상세 조회
    path('events/<int:event_id>/', EventDetailView.as_view(), name='event-detail'),
    
    path('search/', SearchAllView.as_view(), name='search-all'),
]