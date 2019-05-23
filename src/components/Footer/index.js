/** @jsx jsx */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { jsx } from '@emotion/core';

const Footer = () => (
  <div css={{ height: '50px', width: '100%', borderTop: '1px solid rgb(228, 228, 228)' }}>
    <Container>
      <Row>
        <Col>
          <div css={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '11px 0'
          }}>
            <span>
              Made for CodeGrit React Course
            </span>
          </div>
        </Col>
      </Row>
    </Container>
  </div>
)

export default Footer