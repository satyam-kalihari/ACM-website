import React from 'react'
import Leaderboard from '@/components/Leaderboard'
import Footer from '@/components/Footer'

const LeaderBoard = () => {
    return (
        <div className="w-full max-w-5xl mx-auto space-y-12 pb-10">
            <Leaderboard />
            <Footer />
        </div>
    )
}

export default LeaderBoard