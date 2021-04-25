import React, { memo } from 'react'
import { Card, Col } from 'antd'

interface IProps {
    total: number
    title: string
    loading: boolean
}

const CardGroup: React.FC<IProps> = memo(({ total, loading, title }) => (
    <Col span={24} md={6}>
        <Card title={title} loading={loading}>
            <Card.Meta
              title='总人数'
              description={total} />
        </Card>
    </Col>
))

export default CardGroup
