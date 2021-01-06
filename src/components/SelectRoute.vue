<template>
    <div v-if="routes && routes.length" class="select-route">
        <div class="title">
            Выберите Ваш маршрут:
        </div>
        <v-card v-for="(route, idx) in routes"
            :key="route.arrival"
            @click="onRouteSelect(route)"
            class="card"
            elevation="2"
            outlined
            hover
            tile>
            <i class="fas fa-subway train-icon"></i>
            <span class="number">
                {{ route.thread.number }}
            </span>
            <!-- <span class="route-title">
                {{ route.thread.title }}
            </span> -->

            <div class="row">
                <div class="time">
                    {{ route.departure.slice(11, 16) }}
                </div>
                <div class="line"></div>
                <div class="time">
                    {{ route.arrival.slice(11, 16) }}
                </div>
            </div>

            <div class="row">
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
                    {{ currentStop[idx].from }} <i class="fas fa-long-arrow-alt-right"></i> {{ currentStop[idx].to }}
                </span>
                <span v-else>
                    {{ currentStop[idx] }}
                </span>
            </div>
        </v-card>
    </div>
    <div v-else-if="isLoading" class="loader">
    </div>
    <div v-else class="select-route-onerr">
        Похоже, все электрички Москва - Петушки сейчас в депо. Хотите просто послушать истории?
        <br><br>
        <v-btn
            @click="$emit('route-selected', 'default')"
            text
            class="main-btn"
        >
            Послушать
        </v-btn>
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
                        const nextStop = route.stops.findIndex(stop => stop.departure > now);
                        switch (nextStop) {
                        case -1:
                            return route.stops[route.stops.length - 1].arrival > now ?
                                {
                                    from: route.stops[route.stops.length - 2].title,
                                    to: route.stops[route.stops.length - 1].title
                                } :
                                route.stops[route.stops.length - 1].title;
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
            setTimeout(() => this.$emit('route-selected', route), 200);
        }
    },
}
</script>

<style lang="scss" scoped>
    .select-route, .select-route-onerr {
        padding: 16px;
    }
    
    .select-route-onerr {
        max-width: 400px;
        margin: auto;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .row {
        margin: 0 !important;
        justify-content: space-between;
    }

    .title {
        margin-bottom: 16px;
    }

    .train-icon {
        color: $main;
    }

    .card {
        text-align: left;
        padding: 4px;
        margin-bottom: 16px;
    }

    .time {
        font-size: 24px;
    }

    .now-station {
        font-size: 12px;
    }

    .station-name {
        font-size: 14px;
    }

    .line {
        height: 2px;
        flex: auto;
        background-color: $gray;
        align-self: center;
        margin: 0 8px;
    }

    .row {
        display: flex;
    }
</style>