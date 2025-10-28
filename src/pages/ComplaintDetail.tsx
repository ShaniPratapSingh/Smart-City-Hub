import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { mockComplaints } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Calendar, User, ArrowLeft, MessageSquare, Clock } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/contexts/AuthContext';

const statusColors = {
  OPEN: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  ASSIGNED: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  IN_PROGRESS: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  RESOLVED: 'bg-green-500/10 text-green-700 dark:text-green-400',
  REJECTED: 'bg-red-500/10 text-red-700 dark:text-red-400',
};

const ComplaintDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [comment, setComment] = useState('');

  const complaint = mockComplaints.find((c) => c.id === id);

  if (!complaint) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Complaint not found</h2>
          <Button onClick={() => navigate('/complaints')}>Go back to complaints</Button>
        </div>
      </div>
    );
  }

  const handleAddComment = () => {
    if (!comment.trim()) return;
    toast.success('Comment added successfully');
    setComment('');
  };

  const getTimeline = () => {
    const timeline = [
      {
        status: 'Created',
        date: complaint.createdAt,
        description: `Complaint raised by ${complaint.raisedBy.name}`,
      },
    ];

    if (complaint.status !== 'OPEN') {
      timeline.push({
        status: 'Assigned',
        date: complaint.updatedAt,
        description: `Assigned to ${complaint.assignedTo?.name}`,
      });
    }

    if (complaint.status === 'IN_PROGRESS') {
      timeline.push({
        status: 'In Progress',
        date: complaint.updatedAt,
        description: 'Work has started on this complaint',
      });
    }

    if (complaint.status === 'RESOLVED') {
      timeline.push({
        status: 'Resolved',
        date: complaint.resolvedAt!,
        description: 'Complaint has been successfully resolved',
      });
    }

    return timeline;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="space-y-2 flex-1">
                    <h1 className="text-2xl font-bold">{complaint.title}</h1>
                    <div className="flex flex-wrap gap-2">
                      <Badge className={statusColors[complaint.status]}>
                        {complaint.status.replace('_', ' ')}
                      </Badge>
                      <Badge variant="outline">{complaint.category}</Badge>
                      <Badge variant="outline">{complaint.priority} Priority</Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{complaint.description}</p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{complaint.locationAddress}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{new Date(complaint.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Raised by {complaint.raisedBy.name}</span>
                  </div>
                  {complaint.assignedTo && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Assigned to {complaint.assignedTo.name}</span>
                    </div>
                  )}
                </div>

                {/* Map placeholder */}
                <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <MapPin className="h-12 w-12 mx-auto mb-2" />
                    <p>Location Map</p>
                    <p className="text-sm">
                      {complaint.latitude.toFixed(4)}, {complaint.longitude.toFixed(4)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Comments & Updates
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {complaint.comments.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No comments yet. Be the first to comment!
                  </p>
                ) : (
                  <div className="space-y-4">
                    {complaint.comments.map((comment) => (
                      <div key={comment.id} className="border-l-2 border-primary pl-4 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{comment.author.name}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(comment.postedAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm">{comment.message}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-2">
                  <Textarea
                    placeholder="Add a comment or update..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                  <Button onClick={handleAddComment} disabled={!comment.trim()}>
                    Add Comment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Timeline */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Status Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getTimeline().map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {index !== getTimeline().length - 1 && (
                          <div className="w-px h-full bg-border mt-1" />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <p className="font-medium text-sm">{item.status}</p>
                        <p className="text-xs text-muted-foreground mb-1">
                          {new Date(item.date).toLocaleString()}
                        </p>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full">
                  Share Complaint
                </Button>
                <Button variant="outline" className="w-full">
                  Export Details
                </Button>
                {complaint.status === 'RESOLVED' && (
                  <Button variant="outline" className="w-full">
                    Rate Resolution
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;
