import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/Navbar'

const style = {
  wrapper: `h-screen w-screen flex flex-col`,
}

export default function Home() {
  return (
    <div className={style.wrapper}>
      <Navbar/>
      {/* { navbar } */}
      <div className={style.main}>
        {/* { map } */}
      </div>
      <div className={style.rideRequestContainer}>
        <div className={style.rideRequest}>
          {/* {location selector} */}
          {/* {conrfirm ride} */}
        </div>
      </div>
    </div>
  )
}
