import React from 'react'
import styles from './chain.module.scss'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'

const Resource = () => {
    return (
        <div className={styles.resource}>
            <img src="./polygonIcon.png" alt="" />
            <div className={styles.rInfo}>
                <h1>Course Name</h1>
                <div className={styles.tags}>
                    <span>Product Designer</span>
                    <span>Product Designer</span>
                </div>
                <p>Polygon is an Indian blockchain scalability platform. It addresses the challenges faced by Ethereum. Polygon is an Indian blockchain scalability platform. It addresses the challenges faced by Ethereum.</p>
                <button>Go to the Course</button>
            </div>
        </div>
    )
}

function Index() {
    return (
        <><Nav />
            <div className={styles.chainPage}>
                <div className={styles.head}>
                    <img src="./polygonIcon.png" alt="" />
                    <div className={styles.info}>
                        <h1>Polygon</h1>
                        <h2>About Polygon</h2>
                        <p>This JavaScript crash course covers the basics of programming through advanced topics like asynchronous requests and promises. The most used developer tools and libraries for Ethereum are JavaScript based, making it a key foundation to web3 development.</p>
                    </div>
                </div>
                <span className={styles.secTitle}>Resources</span>
                <div className={styles.resourcesCon}>
                    <Resource />
                    <Resource />
                    <Resource />
                    <Resource />
                    <Resource />
                    <Resource />
                    <Resource />
                    <Resource />
                    <Resource />
                    <Resource />
                    <Resource />
                    <Resource />
                    <Resource />
                    <Resource />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Index 