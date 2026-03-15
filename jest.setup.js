import '@testing-library/jest-dom/extend-expect'
import fetch from 'node-fetch'
if (typeof global.fetch === 'undefined') {
  global.fetch = fetch
}