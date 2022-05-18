import mapboxgl from 'mapbox-gl'
import { useEffect } from 'react'

const style = {
    wrapper: `flex-1 h-full w-full`,
}

mapboxgl.accessToken = 'pk.eyJ1IjoidmludmluMDEwIiwiYSI6ImNsMHZ3Y21ybTA1cWkzcXJwN2c3Nml5N2wifQ.TNCPP-EVcqD3fARYYgy9ng'

console.log(process.env.MAPBOX_ACCESS_TOKEN)

const Map = () => {
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/vinvin010/cl0vwo9zk001614rovsddy3vg',
            center: [37.301850, 76.033330],
            zoom: 3,
        })
    }, [])
    return <div className={style.wrapper} id='map' />
}

export default Map