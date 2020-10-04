module.exports = {
    "css": {
        "loaderOptions": {
            "scss": {
                "prependData": "@import \"~@/scss/variables.scss\";"
            }
        }
    },
    "devServer": {
        "port": 9000,
        "host": "0.0.0.0",
        "disableHostCheck": true
    },
    "transpileDependencies": [
        "vuetify"
    ]
}