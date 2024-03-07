import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
      <Container className='mt-5 bg-transparent shadow p-4 mb-5 rounded'>
          <Row>
              <Col xl className='py-4'>
                  <p className='text-danger font-weight-bold h6'>Hổ trợ khách hàng</p>
                  <p>Danh sách cửa hàng</p>
                  <p>Mua hàng trả góp</p>
                  <p>Tra cứu điểm thành viên</p>
                  <p>Tuyển dụng mới nhất</p>
              </Col>
              <Col xl className='py-4'>
                  <p className='text-danger font-weight-bold h6'>Hổ trợ khách hàng</p>
                  <p>Chính sách bảo hành</p>
                  <p>Chính sách đổi trả</p>
                  <p>Chính sách bán hàng</p>
                  <p>Hướng dẫn mua hàng Online</p>
              </Col>
              <Col xl className='py-4'>
                  <p className='text-danger font-weight-bold h6'>Hổ trợ khách hàng</p>
                  <p className='w-100 d-flex'><span style={{ width:'90px'}}>Kỹ thuật:</span> <span className=''><span className='h6 text-primary'>0306211352</span> - Hồ Đăng Huy</span></p>
                  <p className='w-100 d-flex'><span style={{ width:'90px'}}>Bảo hành:</span> <span className=''><span className='h6 text-primary'>0306211331</span> - Phạm Quảng Bình</span></p>
                  <p className='w-100 d-flex'><span style={{ width:'90px'}}>Hổ trợ:</span> <span className=''><span className='h6 text-primary'>0306211385</span> - Nguyễn Minh Phát</span></p>
              </Col>
             
          </Row>
       
      </Container>
  )
}

export default Footer
