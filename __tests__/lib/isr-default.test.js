describe('blog ISR defaults', () => {
  const originalInterval = process.env.NEXT_PUBLIC_REVALIDATE_SECOND

  afterEach(() => {
    if (originalInterval === undefined) {
      delete process.env.NEXT_PUBLIC_REVALIDATE_SECOND
    } else {
      process.env.NEXT_PUBLIC_REVALIDATE_SECOND = originalInterval
    }
    jest.resetModules()
  })

  it('defaults to one hour when no environment override is set', () => {
    delete process.env.NEXT_PUBLIC_REVALIDATE_SECOND
    jest.resetModules()
    expect(require('@/blog.config').NEXT_REVALIDATE_SECOND).toBe(3600)
  })

  it('preserves an explicit environment override', () => {
    process.env.NEXT_PUBLIC_REVALIDATE_SECOND = '7200'
    jest.resetModules()
    expect(require('@/blog.config').NEXT_REVALIDATE_SECOND).toBe('7200')
  })
})
