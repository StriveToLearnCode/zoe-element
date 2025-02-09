import { expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue'; 

// 1. Button Type Tests
test('should render primary button correctly', () => {
  const wrapper = mount(<Button type="primary">Primary Button</Button>);
  expect(wrapper.text()).toBe('Primary Button');
  expect(wrapper.classes()).toContain('btn-primary');
});

test('should render secondary button correctly', () => {
  const wrapper = mount(<Button type="secondary">Secondary Button</Button>);
  expect(wrapper.text()).toBe('Secondary Button');
  expect(wrapper.classes()).toContain('btn-secondary');
});

test('should render tertiary button correctly', () => {
  const wrapper = mount(<Button type="tertiary">Tertiary Button</Button>);
  expect(wrapper.text()).toBe('Tertiary Button');
  expect(wrapper.classes()).toContain('btn-tertiary');
});

// 2. Button State Tests
test('should render button in normal state', () => {
  const wrapper = mount(<Button type="primary" disabled={false} loading={false}>Normal Button</Button>);
  expect(wrapper.classes()).not.toContain('btn-disabled');
  expect(wrapper.classes()).not.toContain('btn-loading');
});

test('should render button in disabled state', () => {
  const wrapper = mount(<Button type="primary" disabled={true}>Disabled Button</Button>);
  expect(wrapper.classes()).toContain('btn-disabled');
  expect(wrapper.props().disabled).toBe(true);
});

test('should render button in loading state', () => {
  const wrapper = mount(<Button type="primary" loading={true}>Loading Button</Button>);
  expect(wrapper.classes()).toContain('btn-loading');
  expect(wrapper.find('.loading-spinner').exists()).toBe(true);
});

test('should render button in active state', () => {
  const wrapper = mount(<Button type="primary" active={true}>Active Button</Button>);
  expect(wrapper.classes()).toContain('btn-active');
});

// 3. Button Size and Style Tests
test('should render button with small size', () => {
  const wrapper = mount(<Button size="small">Small Button</Button>);
  expect(wrapper.classes()).toContain('btn-small');
});

test('should render button with large size', () => {
  const wrapper = mount(<Button size="large">Large Button</Button>);
  expect(wrapper.classes()).toContain('btn-large');
});

test('should render button with custom color', () => {
  const wrapper = mount(<Button color="danger">Danger Button</Button>);
  expect(wrapper.classes()).toContain('btn-danger');
});

// 4. Button Interaction Tests
test('should trigger onClick event on button click', async () => {
  const onClick = vi.fn();
  const wrapper = mount(<Button onClick={onClick}>Click Me</Button>);
  await wrapper.trigger('click');
  expect(onClick).toHaveBeenCalledTimes(1);
});

test('should not trigger onClick when button is disabled', async () => {
  const onClick = vi.fn();
  const wrapper = mount(<Button disabled={true} onClick={onClick}>Disabled Button</Button>);
  await wrapper.trigger('click');
  expect(onClick).toHaveBeenCalledTimes(0);
});

// 5. Accessibility Tests
test('should have ARIA label for accessibility', () => {
  const wrapper = mount(<Button aria-label="Submit">Submit</Button>);
  expect(wrapper.attributes('aria-label')).toBe('Submit');
});

test('should focus button when Tab key is pressed', async () => {
  const wrapper = mount(<Button>Focusable Button</Button>);
  await wrapper.trigger('keydown', { key: 'Tab' });
  expect(document.activeElement).toBe(wrapper.element);
});

// 6. Responsive Design Tests
test('should adapt button size on different screen widths', async () => {
  global.innerWidth = 480; // simulate small screen width
  const wrapper = mount(<Button size="medium">Responsive Button</Button>);
  expect(wrapper.classes()).toContain('btn-small'); // Assuming responsive behavior
  
  global.innerWidth = 1024; // simulate larger screen width
  await wrapper.vm.$nextTick();
  expect(wrapper.classes()).toContain('btn-medium');
});

// 7. Edge Case Tests
test('should not trigger onClick event when button is loading', async () => {
  const onClick = vi.fn();
  const wrapper = mount(<Button loading={true} onClick={onClick}>Loading Button</Button>);
  await wrapper.trigger('click');
  expect(onClick).toHaveBeenCalledTimes(0);
});

test('should not trigger onClick event when button is disabled and loading', async () => {
  const onClick = vi.fn();
  const wrapper = mount(<Button disabled={true} loading={true} onClick={onClick}>Disabled and Loading Button</Button>);
  await wrapper.trigger('click');
  expect(onClick).toHaveBeenCalledTimes(0);
});

test('should handle multiple button states correctly', async () => {
  const wrapper = mount(<Button disabled={true} loading={true}>Disabled and Loading Button</Button>);
  expect(wrapper.classes()).toContain('btn-disabled');
  expect(wrapper.classes()).toContain('btn-loading');
  await wrapper.trigger('click');
  expect(wrapper.props().disabled).toBe(true); // no action triggered
});
