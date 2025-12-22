import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { PublishHelpRequestForm } from '@/components/pod/PublishHelpRequestForm';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the service
vi.mock('@/services/podService', () => ({
  createSupportRequest: vi.fn(),
}));

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('PublishHelpRequestForm', () => {
  it('renders the form with all fields', () => {
    renderWithClient(<PublishHelpRequestForm />);
    expect(screen.getByLabelText('Category')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Urgency')).toBeInTheDocument();
    expect(screen.getByText('Post Help Request')).toBeInTheDocument();
  });

  it('submits the form with the correct data', async () => {
    const { createSupportRequest } = await import('@/services/podService');
    (createSupportRequest as any).mockResolvedValue({ success: true });

    renderWithClient(<PublishHelpRequestForm />);

    fireEvent.change(screen.getByLabelText('Category'), { target: { value: 'Test Category' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Test Description' } });
    fireEvent.change(screen.getByLabelText('Urgency'), { target: { value: 'High' } });

    fireEvent.click(screen.getByText('Post Help Request'));

    await screen.findByText('Help request posted successfully!');

    expect(createSupportRequest).toHaveBeenCalledWith({
      category: 'Test Category',
      description: 'Test Description',
      urgency: 'High',
    });
  });
});
