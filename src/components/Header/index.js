/** @jsx jsx */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { jsx } from '@emotion/core'
import { ReactComponent as Logo } from '../../images/myquiz.svg'

const Header = () => (
  <div css={{ height: '50px', width: '100%', borderBottom: '1px solid rgb(228, 228, 228)' }}>
    <Container>
      <Row>
        <Col>
          <div css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <div className="logo-wrapper" css={{ padding: '11px 0' }}>
              <a href="/">
                <Logo height='28px' width='95px' />
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
)

export default Header