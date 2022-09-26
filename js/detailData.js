'use strict';

const detailData = () => {
    const preloader = document.querySelector('.preloder');

    const renderGanreList = (ganres) => {                                                // dropdown menu
        const dropdownBlock = document.querySelector('.header__menu .dropdown');
        dropdownBlock.innerHTML = '';
        ganres.forEach(ganre => {
            dropdownBlock.insertAdjacentHTML('afterbegin', `
                <li><a href="./categories.html?ganre=${ganre}">${ganre}</a></li>
            `)
        })
    }

    const renderAnimeDetails = (array, itemId) => {   
        const animeObj = array.find(item => item.id == itemId);
        const imageBlock = document.querySelector('.anime__details__pic ');
        const viewsBlock = document.querySelector('.view');
        const titleBlock = document.querySelector('.anime__details__title h3');
        const subTitleBlock = document.querySelector('.anime__details__title span');
        const descriptionBlock = document.querySelector('.anime__details__text p');
        const widgetList = document.querySelectorAll('.anime__details__widget ul li');
        const breadcrumbs = document.querySelector('.breadcrumb__links span')
        
        if(animeObj) {
            console.log(animeObj);
            imageBlock.dataset.setbg = animeObj.image;
            viewsBlock.innerHTML = '';
            viewsBlock.insertAdjacentHTML('beforeend', `
                <i class="fa fa-eye"></i>${animeObj.views}</div>
            `)

            titleBlock.textContent = animeObj.title;   
            subTitleBlock.textContent = animeObj['original-title'];
            descriptionBlock.textContent = animeObj.description;
            breadcrumbs.textContent = animeObj.ganre;

            widgetList[0].insertAdjacentHTML('beforeend', `
                <span>Date aired:</span>${animeObj.date}
            `);

            widgetList[1].insertAdjacentHTML('beforeend', `
                <span>Rating:</span>${animeObj.rating}
            `);

            widgetList[2].insertAdjacentHTML('beforeend', `
                <span>Genre:</span>${animeObj.tags.join(', ')}
            `);


            document.querySelectorAll('.set-bg').forEach((elem) => {
                elem.style.backgroundImage = `url(${elem.dataset.setbg})`;
            }) 

            setTimeout(() => {
                preloader.classList.remove('active');
            }, 300);

        }   else {
            console.log('Аниме отсутствует');
        }                                 
    };

    fetch('./db.json')
    .then((response) => response.json())
    .then((data) => {

        const ganres = new Set();
        const ganreParams = new URLSearchParams(window.location.search).get('itemId');
        
        data.anime.forEach((item) => {
            ganres.add(item.ganre)
        })
        
        if(ganreParams) {                               // отображение одной категории
            renderAnimeDetails(data.anime, ganreParams);

        } else {
            console.log('Аниме отсутствует');
        }

        renderGanreList(ganres);
    })
};

detailData();