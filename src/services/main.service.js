class MainService {
    async getRoute() {
        const yandexData = await import('../../public/routes/spb-luga.json');
        // I put -2 so user won't go in on the last stop :)
        const userFirstStop = Math.floor(Math.random() * yandexData.stops.length - 2);
        const departureTime = Date.now() - yandexData.stops[userFirstStop].duration * 1000;

        return {
            title: yandexData.short_title,
            departureTime,
            stops: yandexData.stops.map(el => ({
                title: el.station.popular_title || el.station.title,
                time: el.duration * 1000 + departureTime
            }))
        }
    }
}

export default new MainService();
