import axios from 'axios';
import { RASP_PROXY_URL } from '../config';

class MainService {
    async getRoutes() {
        let date = new Date();
        date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        const todayRoutesDto = await axios.get(
            `${RASP_PROXY_URL}/?mp-action=search&from=c213&to=s9612144&transport_types=suburban&date=${date}`,
        );
        const now = Date.now();
        const nowRoutes = await Promise.all(todayRoutesDto.data.segments.filter(route => {
            if (route.thread.express_type) return false;

            const departure = this.getUnixFromISODate(route.departure);
            const arrival = this.getUnixFromISODate(route.arrival);

            // return true if the train will departure from the first station in 30 min, or it is on the way now
            return now > departure - 1800000 && now < arrival;
        }).map(async route => {
            const unixDeparture = this.getUnixFromISODate(route.departure);
            const unixArrival = this.getUnixFromISODate(route.arrival);
            const stopsDto = await axios.get(
                `${RASP_PROXY_URL}/?mp-action=thread&?date=${date}&uid=${route.thread.uid}`
            );

            return {
                unixArrival,
                unixDeparture,
                ...route,
                stops: stopsDto.data.stops.map(stop => {
                    let title;
                    if (stop.station.title.startsWith('Нижегородская')) {
                        title = 'Нижегородская';
                    } else {
                        title = stop.station.popular_title || stop.station.title;
                    }
                    return {
                        title,
                        departure: this.getUnixFromISODate(stop.departure),
                        arrival: this.getUnixFromISODate(stop.arrival)
                    }
                })
            };
        }));

        return nowRoutes;
    }

    getUnixFromISODate(iso) {
        // memoization?
        if (typeof iso !== 'string') return false;

        const s = iso.slice.bind(iso);
        return new Date(s(0, 4), s(5, 7) - 1, s(8, 10), s(11, 13), s(14, 16), s(17, 19)).valueOf();
    }
}

export default new MainService();
