import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const FooterShow = () => {
  return (
    <Container className='mt-5'>
      <Row>
        Footer
      </Row>
      <Row>
        <Col xl>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </Col>
        <Col xl>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>

        </Col>
        <Col xl>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
        </Col>
      </Row>
      <Row xl={12} md={12}>
        <h3>Hồ Đăng Huy - Nguyễn Minh Phát - Phạm Quảng Bình</h3>
      </Row>
    </Container>
  )
}

export default FooterShow
