import { calculateCoffeeStats, calculateCurrentCaffeineLevel, coffeeConsumptionHistory, getTopThreeCoffees, statusLevels } from "../utils"

// this StatCard functon is used to re-create the cards while having option to input different data for the children prop. allows for easy reusage and modifing.
function StatCard(props) {
    const { lg, title, children } = props
    return (
        <div className={'card stat-card ' + (lg ? ' col-span-2' : '')}> {/*if lg prop is true set span double length */}
            <h4>{title}</h4> {/* take destructured title prop info  */}
            {children}
        </div>
    )
}

export default function Stats() {
    // call calculate stats function from utils
    const stats = calculateCoffeeStats(coffeeConsumptionHistory)

    const caffeineLevel = calculateCurrentCaffeineLevel(coffeeConsumptionHistory)

    // access statusLevels[x] from the utils data. maxLevel is how much caffeine for each level
    const warningLevel = caffeineLevel < statusLevels['low'].maxLevel ?
        'low' :
        caffeineLevel < statusLevels['moderate'].maxLevel ?
            'moderate' :
            'high'

    return (
        <>
            <div className="section-header">
                <i className="fa-solid fa-chart-simple" />
                <h2>Stats</h2>
            </div>
            <div className="stats-grid">
                <StatCard lg title="Active Caffeine Level">
                    <div className="status">
                        <p><span className="stat-text">{caffeineLevel}</span>mg</p>
                        <h5 style={{ color: statusLevels[warningLevel].color, background: statusLevels[warningLevel].background }}>{warningLevel}</h5>
                    </div>
                </StatCard>  {/* lg prop is default set to true because it matches destructured props value in line 2 */}
                <StatCard title="Daily Caffeine">
                    <p><span className="stat-text">{stats.daily_caffeine}</span>mg</p>
                </StatCard>
                <StatCard title="Avg # of Coffees">
                    <p><span className="stat-text">{stats.average_coffees}</span></p>
                </StatCard>
                <StatCard title="Daily Cost ($)">
                    <p>$ <span className="stat-text">{stats.daily_cost}</span></p>
                </StatCard>
                <StatCard title="Total Cost ($)">
                    <p>$ <span className="stat-text">{stats.total_cost}</span></p>
                </StatCard>
                <table className="stat-table">
                    <thead>
                        <tr>
                            <th>Coffee Name</th>
                            <th>Number of Purchase</th>
                            <th>Percentage of Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {getTopThreeCoffees(coffeeConsumptionHistory).map((coffee, coffeeIndex) => {
                            return (
                                <tr key={coffeeIndex}>
                                    <td>{coffee.coffeeName}</td>
                                    <td>{coffee.count}</td>
                                    <td>{coffee.percentage}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}