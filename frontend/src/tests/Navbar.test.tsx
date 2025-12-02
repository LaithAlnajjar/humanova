import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import '@/lib/i18n';

describe('Navbar', () => {
  const renderNavbar = () =>
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

  it('renders brand name', () => {
    renderNavbar();
    expect(screen.getByText(/Humanova/i)).toBeInTheDocument();
  });

  it('has theme toggle button', () => {
    renderNavbar();
    const btn = screen.getByRole('button', { name: /toggle dark mode/i });
    expect(btn).toBeInTheDocument();
  });

  it('has language toggle button', () => {
    renderNavbar();
    const btn = screen.getByRole('button', { name: /switch language/i });
    expect(btn).toBeInTheDocument();
  });
});
