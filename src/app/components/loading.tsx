'use client'
import { Spin } from 'antd'

export default function Loading() {
  return (
    <div className='min-h-screen w-full flex justify-center items-center'>
      <Spin>
        <div style={{ height: 200 }} />
      </Spin>
    </div>
  )
}