describe('getNotionAPI', () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...originalEnv }
    delete process.env.API_BASE_URL
  })

  afterEach(() => {
    process.env = originalEnv
  })

  it.each([
    ['fork default', undefined, 'https://nickcheng.notion.site/api/v3'],
    ['environment override', 'https://app.notion.com/api/v3', 'https://app.notion.com/api/v3']
  ])('sets the configured Notion API host and User-Agent (%s)', async (_, apiBaseUrl, expectedApiBaseUrl) => {
    if (apiBaseUrl) process.env.API_BASE_URL = apiBaseUrl
    const NotionAPI = jest.fn().mockImplementation(() => ({
      getPage: jest.fn().mockResolvedValue({})
    }))
    jest.doMock('notion-client', () => ({ NotionAPI }))

    const notionAPI = require('@/lib/db/notion/getNotionAPI').default
    await notionAPI.getPage('page-id')

    expect(NotionAPI).toHaveBeenCalledWith(
      expect.objectContaining({
        apiBaseUrl: expectedApiBaseUrl,
        ofetchOptions: {
          headers: {
            'User-Agent': 'NotionNext (+https://github.com/NotionNext/NotionNext)'
          }
        }
      })
    )
  })
})
