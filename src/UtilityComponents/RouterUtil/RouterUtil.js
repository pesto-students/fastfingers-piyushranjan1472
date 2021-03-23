// const navigateTo = url => {
//     window.history.pushState(null, null, url);
//     RouterUtils();
// }
import LoginComponent from '../../Components/LoginComponent/LoginComponent';

const RouterUtils = async () => {
    const routes = [
        { path: "/", component: LoginComponent },
        // { path: "/play", component: () => }
    ];

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: window.location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    };
    // const view = new match.route.component();
    // return view;
    document.querySelector('#content').innerHTML = await match.route.component();
}

export default RouterUtils;