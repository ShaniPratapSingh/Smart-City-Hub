import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { mockComplaints } from '@/data/mockData';
import { ComplaintCard } from '@/components/complaints/ComplaintCard';

const Dashboard = () => {
  const { user } = useAuth();
  const [userComplaints] = useState(mockComplaints.filter(c => c.raisedBy.id === user?.id || true));

  const stats = {
    total: userComplaints.length,
    open: userComplaints.filter(c => c.status === 'OPEN').length,
    inProgress: userComplaints.filter(c => c.status === 'IN_PROGRESS' || c.status === 'ASSIGNED').length,
    resolved: userComplaints.filter(c => c.status === 'RESOLVED').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container py-8 md:py-12">
        <div className="mb-10">
          <h1 className="mb-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-muted-foreground text-lg">Manage your civic complaints and track their progress</p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-10">
          <Card className="shadow-card border-l-4 border-l-primary hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Complaints</CardTitle>
              <FileText className="h-5 w-5 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.total}</div>
              <p className="text-xs text-muted-foreground mt-1">All time</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-l-4 border-l-status-open hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Open</CardTitle>
              <AlertCircle className="h-5 w-5 text-status-open" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.open}</div>
              <p className="text-xs text-muted-foreground mt-1">Pending review</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-l-4 border-l-status-progress hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">In Progress</CardTitle>
              <Clock className="h-5 w-5 text-status-progress" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.inProgress}</div>
              <p className="text-xs text-muted-foreground mt-1">Being resolved</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-l-4 border-l-status-resolved hover:shadow-elevated transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Resolved</CardTitle>
              <CheckCircle className="h-5 w-5 text-status-resolved" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stats.resolved}</div>
              <p className="text-xs text-muted-foreground mt-1">Successfully closed</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="mb-10 shadow-card bg-gradient-to-br from-card to-card/50">
          <CardHeader>
            <CardTitle className="text-xl">Quick Actions</CardTitle>
            <CardDescription>Manage your civic complaints efficiently</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="shadow-sm">
              <Link to="/complaints/new">
                <Plus className="mr-2 h-4 w-4" />
                New Complaint
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/complaints">View All Complaints</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/map">View Map</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Complaints */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2>Your Recent Complaints</h2>
            <Button asChild variant="link" className="text-primary hover:text-primary/80">
              <Link to="/complaints">View All →</Link>
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {userComplaints.slice(0, 3).map((complaint) => (
              <ComplaintCard key={complaint.id} complaint={complaint} />
            ))}
          </div>
          {userComplaints.length === 0 && (
            <Card className="shadow-card">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No complaints yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Start by reporting a civic issue in your area
                </p>
                <Button asChild>
                  <Link to="/complaints/new">
                    <Plus className="mr-2 h-4 w-4" />
                    Report First Complaint
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
