import React from "react";

export const useCategory = (category,bigCategory) => {
    const categories = {
    movie: {
        "SF/환타지" : "fantasy",
        "공포/스릴러": "thriller",
        "다큐멘터리": "documentary",
        "단편": "shortfilm",
        "드라마": "drama",
        "로맨틱코미디": "RoCo",
        "멜로": "melo",
        "무협": "martial",
        "뮤지컬": "musical",
        "서부": "wetern",
        "애니메이션": "animation",
        "액션/어드벤쳐" : "action",
        "역사": "history",
        "코미디": "comedy",
        "기타": "etc",
    },

    tv:{
        "우리동네": "Neighborhood",
        "스포츠": "Sports",
        "기타": "etc",
        "라이프": "Life",
        "다큐": "Documentary",
        "TV애니메이션": "Animation",
        "TV드라마": "Drama",
        "TV 연예/오락": "Entertainment",
        "TV 시사/교양": "Education",
        "공연/음악": "Music"
    },

    kidsCategory : {
        "기타": "etc",
        "애니메이션": "animation",
        "오락": "entertainment",
        "학습": "study",
    }
}

  const selectedCategory = categories[category];

  // bigCategory 키에 해당하는 값 반환, 키가 없으면 null 반환
  return (selectedCategory ? selectedCategory[bigCategory] || null : null)
};
