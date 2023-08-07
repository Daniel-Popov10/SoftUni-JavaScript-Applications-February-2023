export function initialize(router) {

    const main = document.querySelector('main');
    const nav = document.querySelector('nav');
    nav.addEventListener('click', onNavigate);

    const context = {
        showSection,
        goto,
    }

    return context;

    function showSection(section) {
        main.replaceChildren(section);
    }


    function onNavigate(e) {

        let target = e.target;

        if (target.tagName == 'IMG') {
            target = target.parentElement;
        }

        if (target.tagName === 'A') {
            e.preventDefault();
            const url = new URL(target.href);
            goto(url.pathname);
        }
    }


    function goto(path, ...params) {
        const handler = router[path];
        if (typeof handler === 'function') {
            handler(context, ...params);
        }
    }

}


