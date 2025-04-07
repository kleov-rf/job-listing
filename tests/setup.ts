import '@testing-library/jest-dom'
import {expect, afterEach, vi} from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

// Extend Vitest's expect method with jest-dom matchers
expect.extend(matchers)

// Cleanup after each test case
afterEach(() => {
  cleanup()
})

// Mock PointerEvent for Radix components
window.HTMLElement.prototype.hasPointerCapture = vi.fn();
window.HTMLElement.prototype.releasePointerCapture = vi.fn();
window.HTMLElement.prototype.scrollIntoView = vi.fn();

// Polyfill PointerEvent
class MockPointerEvent extends Event {
  protected button: number;
  protected ctrlKey: boolean;
  constructor(type: string, props: PointerEventInit) {
    super(type, props);
    this.button = props.button || 0;
    this.ctrlKey = props.ctrlKey || false;
  }
}
window.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;
