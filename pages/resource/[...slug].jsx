import React from 'react'
import styles from './resource.module.scss'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import axios from 'axios'
import Head from 'next/head'
import fetchData from '../../utils/fetchData'

function Index({ data, slug }) {

    let [type, resource_type] = slug;
    console.log(type)
    let formatedData = data[type][resource_type]

    let image = formatedData[0].protocols[0].protocol_logo;
    let description = formatedData[0].protocols[0].protocol_description;

    if (type == 'hackathons') {
        image = formatedData[0].hackathons[0].hackathon_logo;
        description = formatedData[0].hackathons[0].description
    }

    return (
        <><Nav />
            <Head>
                <title>Truts Academy</title>
                <meta name="description" content="Truts Academy" />
                <link rel="icon" href="/favicon.png" />
            </Head>
            <div className={styles.chainPage}>
                <div className={styles.head}>
                    <img src={image} alt="" />
                    <div className={styles.info}>
                        <h1>{resource_type}</h1>
                        {/* <h2>About {resource_type}</h2> */}
                        <p>{description}</p>
                    </div>
                </div>
                <span className={styles.secTitle}>Resources</span>
                <div className={styles.resourcesCon}>
                    {formatedData.sort((a, b) => a.title.localeCompare(b.title)).map((ele, idx) => {
                        return (
                            <Resource data={ele} key={idx + 'resource'} />
                        )
                    })}
                </div>
            </div>
            <Footer />
        </>
    )
}

const Resource = ({ data }) => {

    let description = data.providers[0].provider_description || data.protocols[0].protocol_description;
    if (description.length > 150) {
        console.log(description.length)
        description = description.slice(0, 150) + '...';
    }

    let title = data.title.normalize();
    let TITLE_LENGTH = 25
    if (title.length > TITLE_LENGTH) {
        console.log(description.length)
        title = title.slice(0, TITLE_LENGTH) + '...';
    }

    return (
        <div className={styles.resource}>
            <img onError={(e) => {
                e.target.src = data.protocols[0].protocol_logo;
            }}

                src={data.providers[0].provider_logo || data.protocols[0].protocol_logo} alt="" />
            <div className={styles.rInfo}>
                <h1>{title}</h1>
                <div className={styles.tags}>
                    {
                        data.tags.map((ele) => {
                            return (
                                <span className={styles.tag} key={ele + data.title}>{ele}</span>
                            )
                        }).splice(0, 4)
                    }
                    <span className={styles.providerName}>
                        <p>by</p>
                        <h3>{data.providers[0].provider_name}</h3>
                    </span>
                </div>
                <p>{description}</p>
                <span className={styles.btnNav}>
                    <button onClick={() => {
                        openNewTab(data.resource_link)
                    }}>Go to the Course</button>
                    <img onClick={() => {
                        openNewTab(data.providers[0].provider_twitter)
                    }} className={styles.icon} src="/twitter.svg" alt="" />
                </span>
            </div>
        </div>
    )
}




export async function getServerSideProps(ctx) {

    let { slug } = ctx.query
    let data = await fetchData();

    let formatedData = { 'chain': {}, 'infra': {}, 'defi': {}, 'technology': {}, 'hackathons': {} }
    data.items.forEach((ele) => {
        try {
            ele.protocols.forEach((x, idx) => {
                formatedData[`${ele.protocols[0].protocol_type}`][`${ele.protocols[idx].protocol_name}`] = [];
            })
        }
        catch (er) {

        }
    })
    data.items.forEach((ele) => {
        try {
            ele.protocols.forEach((x, idx) => {
                formatedData[`${ele.protocols[0].protocol_type}`][`${ele.protocols[idx].protocol_name}`].push(ele)
            })
        }
        catch (er) {

        }
    })

    data.items.forEach((ele) => {

        if (!ele.hackathons) {
            return
        }

        formatedData['hackathons'][ele.hackathons[0].hackathon_name] = []
    })

    data.items.forEach((ele) => {

        if (!ele.hackathons) {
            return
        }

        formatedData['hackathons'][ele.hackathons[0].hackathon_name].push(ele)
    })

    return {
        props: {
            data: formatedData,
            slug: slug
        }, // will be passed to the page component as props
    }
}

const openNewTab = (url) => {
    if (url.length < 1) return
    let a = document.createElement('a');
    a.target = '_blank';
    a.href = url;
    a.click();
}

export default Index 