import Head from 'next/head'
import Image from 'next/image'
import styles from '../Home/home.module.scss'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import Footer from '../../components/Footer'
import Nav from '../../components/Nav'
import axios from 'axios'
import { invert } from 'lodash'
import fetchData from '../../utils/fetchData'


const CATEGORY_LIST = ['hackathons', 'chains', 'infra', 'defi', 'technology'];

export default function Home({ data }) {

  // console.log(data);
  let type = 'hackathons'; let resource_type = 'ETH India'
  let formatedData = data[type][resource_type]
  let image = formatedData[0].hackathons[0].hackathon_logo;
  let description = formatedData[0].hackathons[0].description

  return (
    <>
      <div className={styles.container}>
        <Nav />
        <Head>
          <title>Truts Academy</title>
          <meta name="description" content="Truts Academy" />
          <link rel="icon" href="/favicon.png" />


          <meta property="og:url" content="https://www.academy.truts.xyz/" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="Truts Academy" />
          <meta property="og:description" content="Only place for all the Developer Resources in Web3" />
          <meta property="og:image" content="/favicon.png" />

          <meta name="twitter:card" content="summary_large_image" />
          <meta property="twitter:domain" content="academy.truts.xyz" />
          <meta property="twitter:url" content="https://www.academy.truts.xyz/" />
          <meta name="twitter:title" content="Truts Academy" />
          <meta name="twitter:description" content="Only place for all the Developer Resources in Web3" />
          <meta name="twitter:image" content="/favicon.png" />

          <link rel="preload" href="./hero_float_1.png" as='image' />
          <link rel="preload" href="./hero_float_2.png" as='image' />
          <link rel="preload" href="./hero_float_1_mobile.png" as='image' />
          <link rel="preload" href="./hero_float_2_mobile.png" as='image' />
        </Head>
        <main className={styles.home}>
          <div className={styles.head} style={{ marginBottom: "100px" }}>
            <img src={image} alt="" />
            <div className={styles.info}>
              <h1>{resource_type}</h1>
              {/* <h2>About {resource_type}</h2> */}
              <p>{description}</p>
            </div>
          </div>
          <div className={styles.content} id='content'>
            <div className={styles.section} id={'chains'}>
              <h1 className={styles.secTitle}>Chains</h1>
              <div className={styles.resourceCon}>
                {
                  Object.keys(data['chain']).sort().map((ele, idx) => {
                    let type = 'chain'
                    let formated_data = data[type][`${ele}`][0].protocols[0];
                    let count = data[type][`${ele}`].length;

                    try {
                      data[type][`${ele}`][0].hackathons[0]
                      if (data[type][`${ele}`][0].hackathons[0].hackathon_name == 'ETH India') {
                        return (
                          <Resource slug={`${type}/${ele}`} count={count} data={formated_data} key={idx} />
                        )
                      }
                      return null
                    } catch (error) {
                      return null
                    }
                  })
                }
              </div>
            </div>
            <div className={styles.section} id={'infra'}>
              <h1 className={styles.secTitle}>Infra and Tools</h1>
              <div className={styles.resourceCon}>
                {
                  Object.keys(data['infra']).sort().map((ele, idx) => {
                    let type = 'infra'
                    let formated_data = data[type][`${ele}`][0].protocols[0];
                    let count = data[type][`${ele}`].length;

                    try {
                      data[type][`${ele}`][0].hackathons[0]
                      if (data[type][`${ele}`][0].hackathons[0].hackathon_name == 'ETH India') {
                        return (
                          <Resource slug={`${type}/${ele}`} count={count} data={formated_data} key={idx} />
                        )
                      }
                      return null
                    } catch (error) {
                      return null
                    }
                  })
                }
              </div>
            </div>
            {/* <div className={styles.section} id={'defi'} >
              <h1 className={styles.secTitle}>Defi</h1>
              <div className={styles.resourceCon}>
                {
                  Object.keys(data['defi']).sort().map((ele, idx) => {
                    let type = 'defi'
                    let formated_data = data[type][`${ele}`][0].protocols[0];
                    let count = data[type][`${ele}`].length;

                    try {
                      data[type][`${ele}`][0].hackathons[0]
                      if (data[type][`${ele}`][0].hackathons[0].hackathon_name == 'ETH India') {
                        return (
                          <Resource slug={`${type}/${ele}`} count={count} data={formated_data} key={idx} />
                        )
                      }
                      return null
                    } catch (error) {
                      return null
                    }
                  })
                }
              </div>
            </div> */}
            {/* <div className={styles.section} id={"technology"}>
              <h1 className={styles.secTitle}>Technologies</h1>
              <div className={styles.resourceCon}>
                {
                  Object.keys(data['technology']).sort().map((ele, idx) => {
                    let type = 'technology'
                    // let formated_data = data[type][`${ele}`][0].protocols[0];
                    let formated_data;
                    let count = data[type][`${ele}`].length;
                    data[type][`${ele}`][0].protocols.forEach((elx) => {
                      if (elx.protocol_name == ele) {
                        formated_data = elx
                      }
                    })

                    try {
                      data[type][`${ele}`][0].hackathons[0]
                      if (data[type][`${ele}`][0].hackathons[0].hackathon_name == 'ETH India') {
                        return (
                          <Resource slug={`${type}/${ele}`} count={count} data={formated_data} key={idx} />
                        )
                      }
                      return null
                    } catch (error) {
                      return null
                    }
                  })
                }
              </div>
            </div> */}
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}

const HackResource = ({ data, count, slug }) => {

  let cardData = data;

  let para = useRef(count)
  const [TITLE_LENGTH, setTITLE_LENGTH] = useState(15);
  const [DESC_LENGTH, setDESC_LENGTH] = useState(75);

  const [description, setDescription] = useState(cardData.description);
  const [title, setTitle] = useState(cardData.hackathon_name.normalize());

  useEffect(() => {
    let paraElm = getComputedStyle(para.current);
    let pararHeight = paraElm.getPropertyValue('height');
    if (pararHeight == '84px') {
      console.log("trim")
      setDESC_LENGTH((c) => { return (c - 20) })
    }

  }, [])

  useEffect(() => {
    // let description = cardData.description;
    if (description.length > DESC_LENGTH) {
      let dc = (description.slice(0, DESC_LENGTH) + '...').normalize();
      setDescription(dc);
    }
    // let title = cardData.hackathon_name.normalize();
    if (title.length > TITLE_LENGTH) {
      let ti = title.slice(0, TITLE_LENGTH) + '...';
      setTitle(ti);
    }
  }, [])


  if (!(data?.hackathon_name.length > 1)) {
    return null
  }


  return (
    <Link href={`/resource/${slug}`}>
      <div className={styles.resource}>
        <img src={cardData.hackathon_logo} alt="" />
        <span>
          <h1>{title}</h1>
          <h3>{count} courses</h3>
          <p ref={para}>{description}</p>
        </span>
      </div>
    </Link>
  )
}


const Resource = ({ data, count, slug }) => {
  let para = useRef(count)
  const [TITLE_LENGTH, setTITLE_LENGTH] = useState(15);
  const [DESC_LENGTH, setDESC_LENGTH] = useState(75);


  const [description, setDescription] = useState(data.protocol_description);
  const [title, setTitle] = useState(data.protocol_name.normalize());

  useEffect(() => {
    let paraElm = getComputedStyle(para.current);
    let pararHeight = paraElm.getPropertyValue('height');
    if (pararHeight == '84px') {
      console.log("trim")
      setDESC_LENGTH((c) => { return (c - 20) })
    }

  }, [])


  useEffect(() => {
    // let description = cardData.description;
    if (description.length > DESC_LENGTH) {
      let dc = (description.slice(0, DESC_LENGTH) + '...').normalize();
      setDescription(dc);
    }
    // let title = cardData.hackathon_name.normalize();
    if (title.length > TITLE_LENGTH) {
      let ti = title.slice(0, TITLE_LENGTH) + '...';
      setTitle(ti);
    }
  }, [])

  if (!(data?.protocol_name.length > 1)) {
    return null
  }

  return (
    <Link href={`/resource/${slug}`}>
      <div className={styles.resource}>
        <img src={data.protocol_logo} alt="" />
        <span>
          <h1>{title}</h1>
          <h3>{count} courses</h3>
          <p ref={para}>{description}</p>
        </span>
      </div>
    </Link>
  )
}

const ScrollCon = () => {
  const [selectedTab, setselectedTab] = useState('chain');

  const scrolltoEnd = () => {
    // document.querySelector('#cat_container').scrollLeft = 99999;
    let rightArrow = document.querySelector('.' + styles.scrollEnd);
    let rightMarker = rightArrow.getBoundingClientRect().x;
    let list = document.querySelector('#cat_container').childNodes;
    let startingPoint;
    list = [...list].forEach((ele, idx) => {
      let x = ele.getBoundingClientRect().x;
      let delta = rightMarker - x;
      console.log(delta, ele.innerText)
      if (delta > 0) {
        startingPoint = ele;
      }
    })
    console.log(startingPoint.innerText);
    document.querySelector('#cat_container').scrollLeft = document.querySelector('#cat_container').scrollLeft + startingPoint.getBoundingClientRect().x;
  }

  const scrolltoStart = () => {
    document.querySelector('#cat_container').scrollLeft = 0;
    // let list = document.querySelector('#cat_container').childNodes;
    // console.log(list);
  }

  let categoryTabs = CATEGORY_LIST.map((ele, idx) => {
    return (
      <button
        id={`t${idx}`}
        onClick={() => {
          setselectedTab(ele);
        }}
        className={(ele == selectedTab) ? styles.categoryTabSelected : styles.categoryTab} key={'cat' + idx}>
        {ele}
      </button>
    )
  })
  return (
    <div className={styles.categoryTabConWrapper}>
      <button className={styles.scrollStart} onClick={scrolltoStart} />
      <div id='cat_container' className={styles.categoryTabCon}>
        {categoryTabs}
      </div>
      <button className={styles.scrollEnd} onClick={scrolltoEnd} />
    </div>
  )
}


export async function getServerSideProps(context) {
  let data = await fetchData();

  let formatedData = { 'chain': {}, 'infra': {}, 'defi': {}, 'technology': {}, 'hackathons': {} }
  data.items.forEach((ele) => {
    try {
      ele.protocols.forEach((x, idx) => {
        formatedData[`${ele.protocols[idx].protocol_type}`][`${ele.protocols[idx].protocol_name}`] = [];
      })
    }
    catch (er) {

    }
  })
  data.items.forEach((ele) => {
    try {
      ele.protocols.forEach((x, idx) => {
        formatedData[`${ele.protocols[idx].protocol_type}`][`${ele.protocols[idx].protocol_name}`].push(ele)
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
      data: formatedData
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