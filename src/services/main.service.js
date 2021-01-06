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
            const stationCodes = ["s2000001", "s9601796", "s9601835", "s9601856", "s9601671", "s9601737", "s9600796", "s9601177", "s9601902", "s9601767", "s9601675", "s9601301", "s9601192", "s9600773", "s9601867", "s9601631", "s9602038", "s9601783", "s9601680", "s9601782", "s9601653", "s9601872", "s9601755", "s9602082", "s9600699", "s9634002", "s9601539", "s9602107", "s9601734", "s9600684", "s9601795", "s9601645", "s9601363", "s9601811", "s9601828", "s9612144"];

            return {
                unixArrival,
                unixDeparture,
                ...route,
                stops: stopsDto.data.stops
                    .filter(stop => stationCodes.includes(stop.station.code))
                    .map(stop => {
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

    getTime(date) {
        const hours = date.getHours();
        const mins = date.getMinutes();
        let result = '';
        for (let i of [hours, mins]) {
            if (i < 10) {
                i = '0' + i;
            }
            result += i += ':';
        }

        return result.slice(0,5);
    }
}

export default new MainService();
