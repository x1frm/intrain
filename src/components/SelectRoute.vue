<template>
    <div v-if="routes && routes.length" class="select-route">
        <div class="title">
            Выберите Ваш маршрут:
        </div>
        <v-card v-for="(route, idx) in routes"
            :key="route.arrival"
            @click="onRouteSelect(route)"
            class="mx-auto"
            elevation="2"
            outlined
            hover
            tile>
            <i class="fas fa-subway"></i>
            <span class="number">
                {{ route.thread.number }}
            </span>
            <span class="route-title">
                {{ route.thread.title }}
            </span>

            <div class="time-row">
                <div class="time">
                    {{ route.departure.slice(11, 16) }}
                </div>
                <div class="line"></div>
                <div class="time">
                    {{ route.arrival.slice(11, 16) }}
                </div>
            </div>

            <div class="stations-row">
                <div class="station-name">
                    Москва
                </div>
                <div class="station-name">
                    Петушки
                </div>
            </div>

            <div v-if="currentStop[idx]" class="now-station">
                Сейчас на:
                <span v-if="typeof currentStop[idx] === 'object'">
                    {{ currentStop[idx].from }} ⟶ {{ currentStop[idx].to }}
                </span>
                <span v-else>
                    {{ currentStop[idx] }}
                </span>
            </div>
        </v-card>
    </div>
    <div v-else class="select-route-onerr">
        <div v-if="isLoading" class="loader">
        </div>
        <div v-else>
            Похоже, все электрички Москва - Петушки сейчас в депо. Хотите просто послушать истории?
        </div>
    </div>
</template>

<script>
import mainService from '../services/main.service'
export default {
    name: 'SelectRoute',
    props: {
        routes: Array || null,
        time: Date
    },
    computed: {
        currentStop() {
            try {
                const now = this.time.valueOf();
                return this.routes.map(route => {
                    try {
                        const nextStop = route.stops.findIndex(stop => stop.time > now);
                        switch (nextStop) {
                        case -1:
                            return route.stops[route.stops.length - 1].title;
                        case 0:
                            return route.stops[0].title;
                        default:
                            return {
                                from: route.stops[nextStop - 1].title,
                                to: route.stops[nextStop].title
                            };
                        }
                    } catch {
                        return false;
                    }
                });
            } catch {
                return [];
            }
        },
        isLoading() {
            return this.routes === null;
        }
    },
    methods: {
        onRouteSelect(route) {
            this.$emit('route-loaded', route);
        }
    },
}
</script>