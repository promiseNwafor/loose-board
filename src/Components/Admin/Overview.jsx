import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../App'

function Overview() {
    const {accounts, facebookItems, getFacebook } = useContext(AuthContext)
    const [facebook, setFacebook] = useState([])
    const [facebookKPI, setFacebookKPI] = useState([])
    const [likes, setLikes] = useState(0)
    const [comments, setComments] = useState(0)
    const [shares, setShares] = useState(0)
    const [saves, setSaves] = useState(0)
    const [leads, setLeads] = useState(0)
    const [impressions, setImpressions] = useState(0)
    const [views, setViews] = useState(0)
    const [downloads, setDownloads] = useState(0)
    const [followers, setFollowers] = useState(0)
    const [reach, setReach] = useState(0)


    // console.log(accounts)
    const getKPIs = () => {
        accounts.map((account, i) => {
            setFacebookKPI(account.facebook)
            // console.log(facebookKPI)
        })
    }

    const filterFacebook = () => {
        const acc = []
       facebookItems.map((account) => {
           account.accounts.map((accAcc) => {
               acc.push(accAcc)
           })
        })
        setFacebook(acc)
        console.log(facebook)
    }

    useEffect(() => {
        // getKPIs()
    // console.log(accounts)
    getFacebook("Cellar Central")
    }, [accounts, facebookItems])

    return (
        <div className="Overview">
            <div className="wrap">
                <div className="head">
                    <h3>Analytics</h3>
                </div>
                <div className="flex">
                    <div className="account">Account</div>
                    <div className="handler">Handler</div>
                    <div className="facebook">Facebook</div>
                    <div className="twitter">Twitter</div>
                    <div className="instagram">Instagram</div>
                    <div className="linkedin">Linkedin</div>
                </div>
                <hr style={{height: 20}}/>
                {/* <div className="each"> */}
                {
                    accounts.map((account, i) => {
                        return <div className="row" key={i}>
                            <p>{account.label}</p>
                            <p>{account.manager}</p>
                            {
                                facebook.map((fb, idx) => {
                                    // let accum = 0
                                    // if (fb.accountName === account.label){
                                    //     accum += fb.engagements.likes
                                        console.log(fb)
                                    // }
                                    // return (
                                    //     <div key={idx} className="">
                                    //         <p>{accum}</p>
                                    //     </div>
                                    // )
                                })
                            }

                        </div>
                    })
                }
                {/* </div> */}
            </div>
        </div>
    )
}

export default Overview
