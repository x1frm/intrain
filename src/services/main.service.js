class MainService {
    async getRoute() {
        const yandexData = await import('../../public/routes/spb-luga.json');
        return {
            title: yandexData.short_title,
            stops: yandexData.stops.map(el => el.popular_title || el.title),
            durations: yandexData.stops.map(el => el.duration)
        }
    }
}

export default new MainService();
