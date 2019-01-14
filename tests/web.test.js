describe('Web tests', () => {
  it('should turn all green on "tests/web/index.html"', async () => {
    await page.goto('http://localhost:9876/tests/web/')
    await page.waitForSelector('#tests.sink-done')
    const clsName = await page.$eval('#tests', el => el.className)
    const fail = await page.$$eval('#tests .fail .fail', failures => {
      return failures.map(failure => {
        const section = failure.parentNode.parentNode
        let chapter = ''
        let current = section.previousSibling
        while (current) {
          if (current.classList.contains('mod')) {
            chapter = current.textContent
            break
          }
          current = current.previousSibling
        }
        return {
          chapter: chapter,
          section: [].reduce.call(section.childNodes, function (a, b) { return a + (b.nodeType === 3 ? b.textContent : '') }, ''),
          message: failure.textContent
        }
      })
    })
    const pass = !!clsName.match(/sink-pass/)

    expect(fail).toEqual([])
    expect(pass).toBeTruthy()
  }, 16000)
})
