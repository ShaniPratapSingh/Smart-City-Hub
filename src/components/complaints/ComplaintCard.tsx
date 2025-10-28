import { Complaint } from '@/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComplaintCardProps {
  complaint: Complaint;
}

const statusColors = {
  OPEN: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  ASSIGNED: 'bg-purple-500/10 text-purple-700 dark:text-purple-400',
  IN_PROGRESS: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  RESOLVED: 'bg-green-500/10 text-green-700 dark:text-green-400',
  REJECTED: 'bg-red-500/10 text-red-700 dark:text-red-400',
};

const priorityColors = {
  LOW: 'bg-gray-500/10 text-gray-700 dark:text-gray-400',
  MEDIUM: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
  HIGH: 'bg-red-500/10 text-red-700 dark:text-red-400',
};

export const ComplaintCard = ({ complaint }: ComplaintCardProps) => {
  return (
    <Card className="shadow-card hover:shadow-elevated transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <h3 className="font-semibold text-lg line-clamp-1">{complaint.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2">{complaint.description}</p>
          </div>
          <Badge className={statusColors[complaint.status]}>
            {complaint.status.replace('_', ' ')}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline">{complaint.category}</Badge>
            <Badge className={priorityColors[complaint.priority]}>
              {complaint.priority} Priority
            </Badge>
          </div>

          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{complaint.locationAddress}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
            </div>
            {complaint.assignedTo && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>Assigned to {complaint.assignedTo.name}</span>
              </div>
            )}
          </div>

          <Button asChild className="w-full" variant="outline">
            <Link to={`/complaints/${complaint.id}`}>View Details</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
