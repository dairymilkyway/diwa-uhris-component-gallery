/**
 * menu-in-modal.test.jsx
 *
 * A Menu inside an open Modal/Dialog: Radix sets pointer-events: none on
 * <body> and closes the dialog on any interaction outside its content, while
 * the Menu panel is portaled to <body>. The panel must stay clickable and must
 * not count as "outside", or the menu items silently do nothing.
 */

const React = require('react');
const { render, screen, fireEvent, act } = require('@testing-library/react');
// Imported directly (not via the library index) so this suite doesn't load
// unrelated components.
const Modal = require('../src/ui-library/gallery/modal/Modal').default;
const { Dialog } = require('../src/ui-library/gallery/dialog/Dialog');
const { Menu } = require('../src/ui-library/gallery/menu/Menu');

const renderMenuIn = (Container, containerProps, onSelect, onClose) =>
  render(
    React.createElement(
      Container,
      { ...containerProps, onClose },
      React.createElement(Menu, {
        trigger: React.createElement('button', { type: 'button' }, 'More actions'),
        items: [{ label: 'Set active', onClick: onSelect }],
      }),
    ),
  );

const openMenuAndSelect = async () => {
  fireEvent.click(screen.getByText('More actions'));
  const item = await screen.findByRole('menuitem', { name: 'Set active' });
  const panel = screen.getByRole('menu');
  // Radix dismisses on pointerdown outside its content, before the click.
  await act(async () => {
    fireEvent.pointerDown(item);
    fireEvent.mouseDown(item);
    fireEvent.pointerUp(item);
    fireEvent.mouseUp(item);
    fireEvent.click(item);
  });
  return panel;
};

describe.each([
  ['Modal', Modal, { isOpen: true, title: 'Levels' }],
  ['Dialog', Dialog, { open: true, title: 'Levels' }],
])('Menu inside an open %s', (_name, Container, props) => {
  it('runs the item action without closing the dialog', async () => {
    const onSelect = jest.fn();
    const onClose = jest.fn();
    renderMenuIn(Container, props, onSelect, onClose);

    const panel = await openMenuAndSelect();

    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
    expect(panel).toHaveAttribute('data-pis-floating');
    expect(panel.style.pointerEvents).toBe('auto');
  });
});
