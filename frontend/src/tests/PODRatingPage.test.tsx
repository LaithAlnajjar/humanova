import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PODRatingPage from '@/pages/POD/PODRatingPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as podService from '@/services/podService';

vi.mock('@/services/podService');

const queryClient = new QueryClient();

const renderWithClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('PODRatingPage', () => {
  it('displays a loading message initially', () => {
    renderWithClient(<PODRatingPage />);
    expect(screen.getByText('Loading completed requests...')).toBeInTheDocument();
  });

  it('displays completed requests and rating forms', async () => {
    const mockRequests = [
      { id: '1', podId: 'pod1', volunteerId: 'vol1', category: 'Category 1', description: 'Description 1', urgency: 'High', status: 'Closed' },
      { id: '2', podId: 'pod1', volunteerId: 'vol2', category: 'Category 2', description: 'Description 2', urgency: 'Low', status: 'Closed' },
    ];
    (podService.getCompletedHelpRequests as vi.Mock).mockResolvedValue(mockRequests);

    renderWithClient(<PODRatingPage />);

    // Wait for the loading to disappear
    await screen.findByText('Category 1');

    expect(screen.getByText('Category 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Category 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();

    // Check for rating forms. We can check for a common element in the form
    const ratingForms = screen.getAllByText('Submit Rating');
    expect(ratingForms).toHaveLength(2);
  });

  it('displays a message when there are no completed requests', async () => {
    (podService.getCompletedHelpRequests as vi.Mock).mockResolvedValue([]);

    renderWithClient(<PODRatingPage />);

    await screen.findByText('No completed help requests to rate.');

    expect(screen.getByText('No completed help requests to rate.')).toBeInTheDocument();
  });
});
