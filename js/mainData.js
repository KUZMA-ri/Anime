'use strict';
const mainData = () => {

    const renderAnimeList = (array, ganres) => {
        console.log(array);
        console.log(ganres);
    };

    const renderTopAnime = (array) => {              // функция для вывода топ-5 видео по просмотрам
        const wrapper = document.querySelector('.filter__gallery');
        wrapper.innerHTML = '';

        array.forEach((item) => {
            // console.log(item);
            wrapper.insertAdjacentHTML('afterbegin', `
            <div class="product__sidebar__view__item set-bg mix" data-setbg="${item.image}">
                <div class="ep">${item.rating}/ 10</div>
                <div class="view"><i class="fa fa-eye"></i>${item.views}</div>
                <h5><a href="#">${item.title}</a></h5>
            </div>
            `)
        });

        wrapper.querySelectorAll('.set-bg').forEach((elem) => {
            elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
        }) 

    }

    fetch('./db.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => {

        const ganres = new Set()
        renderTopAnime(data.anime.sort((a,b) => b.views - a.views).slice(0,5));
        data.anime.forEach((item) => {
            ganres.add(item.ganre)
        })

        renderAnimeList(data.anime, ganres);
    })
};

mainData();