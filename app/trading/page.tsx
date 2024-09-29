"use client"

import React, { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Define types
type StockData = {
    company: string
    high: string
    low: string
    lastPrice: string
    prevClose: string
    change: string
    percentGain: string
}

type TimeData = {
    time: string
    data: StockData[]
}

type MarketData = {
    gainers: TimeData[]
    losers: TimeData[]
}

const StockMarketDashboard: React.FC = () => {
    const [marketData, setMarketData] = useState<MarketData | null>(null)
    const [portfolio, setPortfolio] = useState<{ [key: string]: number }>({})
    const [cash, setCash] = useState(10000) // Starting cash
    const [selectedStock, setSelectedStock] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [selectedTime, setSelectedTime] = useState<string | null>(null)

    const formatTableData = (data: MarketData) => {
        return data.gainers.map((gainerData, index) => {
            const loserData = data.losers[index]
            const topGainers = gainerData.data
                .sort((a, b) => parseFloat(b.percentGain) - parseFloat(a.percentGain))
                .slice(0, 3)
            const topLosers = loserData.data
                .sort((a, b) => parseFloat(a.percentGain) - parseFloat(b.percentGain))
                .slice(0, 3)

            return {
                time: gainerData.time,
                gainers: topGainers,
                losers: topLosers
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data/2024-09-29-stockData.json')
                if (!response.ok) {
                    throw new Error('Failed to fetch market data')
                }
                const data: MarketData = await response.json()
                setMarketData(data)
                if (data.gainers.length > 0) {
                    setSelectedTime(data.gainers[0].time)
                }
            } catch (err) {
                setError('Failed to load market data. Please try again later.')
                console.error('Error fetching market data:', err)
            }
        }

        fetchData()
    }, [])

    const buyStock = () => {
        if (!marketData || !selectedTime) return

        const stock = [...marketData.gainers, ...marketData.losers]
            .find(timeData => timeData.time === selectedTime)?.data
            .find(stock => stock.company === selectedStock)

        if (stock && quantity > 0) {
            const cost = parseFloat(stock.lastPrice.replace(',', '')) * quantity
            if (cost <= cash) {
                setPortfolio(prev => ({
                    ...prev,
                    [selectedStock]: (prev[selectedStock] || 0) + quantity
                }))
                setCash(prev => prev - cost)
            } else {
                setError("Not enough cash!")
            }
        }
    }

    const sellStock = () => {
        if (!marketData || !selectedTime) return

        if (portfolio[selectedStock] && portfolio[selectedStock] >= quantity) {
            const stock = [...marketData.gainers, ...marketData.losers]
                .find(timeData => timeData.time === selectedTime)?.data
                .find(stock => stock.company === selectedStock)

            if (stock) {
                const revenue = parseFloat(stock.lastPrice.replace(',', '')) * quantity
                setPortfolio(prev => ({
                    ...prev,
                    [selectedStock]: prev[selectedStock] - quantity
                }))
                setCash(prev => prev + revenue)
            }
        } else {
            setError("Not enough stocks to sell!")
        }
    }

    const calculatePortfolioValue = () => {
        if (!marketData || !selectedTime) return 0

        return Object.entries(portfolio).reduce((total, [company, quantity]) => {
            const stock = [...marketData.gainers, ...marketData.losers]
                .find(timeData => timeData.time === selectedTime)?.data
                .find(stock => stock.company === company)
            return total + (stock ? parseFloat(stock.lastPrice.replace(',', '')) * quantity : 0)
        }, 0)
    }

    const formatChartData = (data: TimeData[]) => {
        const allCompanies = new Set<string>()
        data.forEach(timeData => {
            timeData.data.forEach(stock => {
                allCompanies.add(stock.company)
            })
        })

        return data.map(timeData => {
            const dataPoint: { [key: string]: any } = { time: timeData.time }
            allCompanies.forEach(company => {
                const stock = timeData.data.find(s => s.company === company)
                if (stock) {
                    dataPoint[`${company}_percentGain`] = parseFloat(stock.percentGain)
                }
            })
            return dataPoint
        })
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-4 border rounded shadow">
                    <p className="font-bold">{label}</p>
                    {payload.map((entry: any) => {
                        const companyName = entry.dataKey.split('_')[0]
                        const percentGain = entry.value

                        return (
                            <p key={entry.dataKey} style={{ color: entry.color }}>
                                {companyName}: {percentGain.toFixed(2)}%
                            </p>
                        )
                    })}
                </div>
            )
        }
        return null
    }

    if (error) {
        return (
            <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )
    }

    if (!marketData) {
        return <div>Loading...</div>
    }

    const chartData = {
        gainers: formatChartData(marketData.gainers),
        losers: formatChartData(marketData.losers)
    }

    return (
        <div className="container mx-auto p-4 mt-6">
            {/*<h1 className="text-3xl font-bold mb-4">Stock Market Dashboard</h1>*/}

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Stock Data Overview</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Time</TableHead>
                                <TableHead colSpan={4} className="text-center bg-green-100">Top Gainers</TableHead>
                                <TableHead colSpan={4} className="text-center bg-red-100">Top Losers</TableHead>
                            </TableRow>
                            <TableRow>
                                <TableHead></TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Last Price</TableHead>
                                <TableHead>Change</TableHead>
                                <TableHead>% Change</TableHead>
                                <TableHead>Company</TableHead>
                                <TableHead>Last Price</TableHead>
                                <TableHead>Change</TableHead>
                                <TableHead>% Change</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {formatTableData(marketData).map((timeData) => (
                                <React.Fragment key={timeData.time}>
                                    {[0, 1, 2].map((index) => (
                                        <TableRow key={`${timeData.time}-${index}`}>
                                            {index === 0 && (
                                                <TableCell rowSpan={3} className="font-medium">
                                                    {timeData.time}
                                                </TableCell>
                                            )}
                                            <TableCell className="bg-green-50">{timeData.gainers[index].company}</TableCell>
                                            <TableCell className="bg-green-50">{timeData.gainers[index].lastPrice}</TableCell>
                                            <TableCell className="bg-green-50">{timeData.gainers[index].change}</TableCell>
                                            <TableCell className="bg-green-50 font-medium text-green-700">
                                                <div className="flex items-center">
                                                    <TrendingUp className="mr-1 h-4 w-4" />
                                                    {timeData.gainers[index].percentGain}%
                                                </div>
                                            </TableCell>
                                            <TableCell className="bg-red-50">{timeData.losers[index].company}</TableCell>
                                            <TableCell className="bg-red-50">{timeData.losers[index].lastPrice}</TableCell>
                                            <TableCell className="bg-red-50">{timeData.losers[index].change}</TableCell>
                                            <TableCell className="bg-red-50 font-medium text-red-700">
                                                <div className="flex items-center">
                                                    <TrendingDown className="mr-1 h-4 w-4" />
                                                    {timeData.losers[index].percentGain}%
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </React.Fragment>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="mb-4">
                <Label htmlFor="time-select">Select Time</Label>
                <Select value={selectedTime || ''} onValueChange={setSelectedTime}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                        {marketData.gainers.map((timeData) => (
                            <SelectItem key={timeData.time} value={timeData.time}>
                                {timeData.time}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Tabs defaultValue="gainers" className="mb-6">
                <TabsList>
                    <TabsTrigger value="gainers">Top Gainers</TabsTrigger>
                    <TabsTrigger value="losers">Top Losers</TabsTrigger>
                </TabsList>
                <TabsContent value="gainers">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Gainers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData.gainers}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis
                                        label={{ value: 'Percentage Change (%)', angle: -90, position: 'insideLeft' }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    {marketData.gainers[0].data.map((stock, index) => (
                                        <Line
                                            key={stock.company}
                                            type="monotone"
                                            dataKey={`${stock.company}_percentGain`}
                                            stroke={`hsl(${index * 30}, 70%, 50%)`}
                                            name={stock.company}
                                        />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="losers">
                    <Card>
                        <CardHeader>
                            <CardTitle>Top Losers</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={chartData.losers}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="time" />
                                    <YAxis
                                        label={{ value: 'Percentage Change (%)', angle: -90, position: 'insideLeft' }}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Legend />
                                    {marketData.losers[0].data.map((stock, index) => (
                                        <Line
                                            key={stock.company}
                                            type="monotone"
                                            dataKey={`${stock.company}_percentGain`}
                                            stroke={`hsl(${index * 30}, 70%, 50%)`}
                                            name={stock.company}
                                        />
                                    ))}
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Virtual Trading</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="stock-select">Select Stock</Label>
                            <Select value={selectedStock} onValueChange={setSelectedStock}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a stock" />
                                </SelectTrigger>
                                <SelectContent>
                                    {[...marketData.gainers, ...marketData.losers]
                                        .flatMap(timeData => timeData.data)
                                        .map(stock => (
                                            <SelectItem key={stock.company} value={stock.company}>
                                                {stock.company}
                                            </SelectItem>
                                        ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input
                                id="quantity"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value))}
                                min="0"
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex space-x-2">
                        <Button onClick={buyStock}>Buy</Button>
                        <Button onClick={sellStock} variant="outline">Sell</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Portfolio Summary</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Cash: ${cash.toFixed(2)}</p>
                    <p>Portfolio Value: ${calculatePortfolioValue().toFixed(2)}</p>
                    <p>Total Value: ${(cash + calculatePortfolioValue()).toFixed(2)}</p>
                    <h3 className="font-bold mt-4">Holdings:</h3>
                    <ul>
                        {Object.entries(portfolio).map(([company, quantity]) => (
                            <li key={company}>{company}: {quantity} shares</li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

        </div>
    )
}

export default StockMarketDashboard
