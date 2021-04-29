import React, { useContext } from 'react'
import { AuthContext } from '../../App'

function Overview() {
    const {accounts} = useContext(AuthContext)
    // console.log(accounts)
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
                            <div className="account">{account.label}</div>
                            <hr/>
                        </div>
                    })
                }
                {/* </div> */}
            </div>
        </div>
    )
}

export default Overview
