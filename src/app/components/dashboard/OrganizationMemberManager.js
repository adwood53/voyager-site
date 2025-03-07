'use client';
// src/app/components/dashboard/OrganizationMemberManager.js

import { useState, useEffect } from 'react';
import { useOrganization, useUser } from '@clerk/nextjs';
import {
  Button,
  Table,
  Select,
  SelectItem,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Spinner,
} from '@heroui/react';
import Image from 'next/image';

/**
 * This component manages organization members using Clerk APIs
 * It allows admins to invite new members, change roles, and remove members
 */
export default function OrganizationMemberManager() {
  const { user } = useUser();
  const {
    organization,
    isLoaded,
    memberships,
    membership: currentUserMembership,
  } = useOrganization({
    memberships: {
      infinite: true, // Enable pagination
      pageSize: 10,
    },
  });

  // Invitation modal state
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('org:member');
  const [isInviting, setIsInviting] = useState(false);
  const [inviteMessage, setInviteMessage] = useState({
    text: '',
    type: '',
  });

  // Available roles state
  const [roles, setRoles] = useState([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);

  // Helper to determine if current user is owner
  const isOwner = currentUserMembership?.role === 'org:owner';
  const isAdmin =
    currentUserMembership?.role === 'org:admin' || isOwner;

  // Load available roles from Clerk
  useEffect(() => {
    const fetchRoles = async () => {
      if (!organization || !isLoaded) return;

      try {
        setIsLoadingRoles(true);
        const response = await organization.getRoles({
          pageSize: 20,
          initialPage: 1,
        });

        setRoles(response.data);
      } catch (error) {
        console.error('Error fetching roles:', error);
      } finally {
        setIsLoadingRoles(false);
      }
    };

    fetchRoles();
  }, [organization, isLoaded]);

  // Function to handle member invitation
  const handleInviteMember = async (e) => {
    e.preventDefault();
    setInviteMessage({ text: '', type: '' });
    setIsInviting(true);

    try {
      await organization.inviteMember({
        emailAddress: email,
        role,
      });

      setInviteMessage({
        text: `Invitation sent to ${email}`,
        type: 'success',
      });
      setEmail('');

      // Refresh the memberships list
      await memberships?.revalidate();

      // Close modal after success
      setTimeout(() => {
        onClose();
        setInviteMessage({ text: '', type: '' });
      }, 2000);
    } catch (error) {
      setInviteMessage({
        text: error.message || 'Failed to send invitation',
        type: 'error',
      });
    } finally {
      setIsInviting(false);
    }
  };

  // Function to handle role change
  const handleRoleChange = async (membershipId, newRole) => {
    if (!isOwner) {
      alert('Only the organization owner can change roles');
      return;
    }

    try {
      // Find the membership
      const membership = memberships.data.find(
        (m) => m.id === membershipId
      );
      if (membership) {
        await membership.update({ role: newRole });
        await memberships.revalidate();
      }
    } catch (error) {
      console.error('Error updating role:', error);
      alert(`Error: ${error.message}`);
    }
  };

  // Function to remove a member
  const handleRemoveMember = async (membershipId) => {
    if (!isOwner) {
      alert('Only the organization owner can remove members');
      return;
    }

    if (confirm('Are you sure you want to remove this member?')) {
      try {
        // Find the membership
        const membership = memberships.data.find(
          (m) => m.id === membershipId
        );
        if (membership) {
          await membership.destroy();
          await memberships.revalidate();
        }
      } catch (error) {
        console.error('Error removing member:', error);
        alert(`Error: ${error.message}`);
      }
    }
  };

  // If data isn't loaded yet, show a loading state
  if (!isLoaded || !memberships) {
    return (
      <div className="flex justify-center items-center p-8">
        <Spinner size="lg" />
        <span className="ml-2">Loading organization data...</span>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Action Button */}
      <div className="mb-6 flex justify-end">
        <Button
          color="primary"
          onClick={onOpen}
          disabled={!isAdmin}
          style={{
            backgroundColor: 'var(--primary-color, #2563EB)',
            color: '#FFFFFF',
            opacity: isAdmin ? 1 : 0.5,
          }}
        >
          Invite New Member
        </Button>
      </div>

      {/* Members Table */}
      <div className="overflow-x-auto border rounded-lg">
        <Table aria-label="Organization Members">
          <Table.Header>
            <Table.Column>Member</Table.Column>
            <Table.Column>Role</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column>Actions</Table.Column>
          </Table.Header>
          <Table.Body>
            {memberships.data?.map((mem) => {
              const isCurrentUser =
                mem.publicUserData?.userId === user?.id;
              const memberEmail =
                mem.publicUserData?.emailAddresses?.[0]
                  ?.emailAddress || '';

              return (
                <Table.Row key={mem.id}>
                  <Table.Cell>
                    <div className="flex items-center">
                      <div className="relative h-8 w-8 mr-3">
                        <Image
                          src={
                            mem.publicUserData?.imageUrl ||
                            '/placeholder-avatar.jpg'
                          }
                          alt={
                            mem.publicUserData?.firstName || 'User'
                          }
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">
                          {mem.publicUserData?.firstName || ''}{' '}
                          {mem.publicUserData?.lastName || ''}
                          {isCurrentUser && ' (You)'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {memberEmail}
                        </div>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    {isOwner ? (
                      <Select
                        aria-label="Change role"
                        className="max-w-[140px]"
                        defaultSelectedKeys={[mem.role]}
                        onChange={(e) =>
                          handleRoleChange(mem.id, e.target.value)
                        }
                        disabled={isCurrentUser} // Can't change own role
                      >
                        {roles.map((role) => (
                          <SelectItem key={role.key} value={role.key}>
                            {role.name ||
                              role.key.replace('org:', '')}
                          </SelectItem>
                        ))}
                      </Select>
                    ) : (
                      <span>{mem.role.replace('org:', '')}</span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {mem.publicUserData?.identifier ? (
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Active
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                        Pending
                      </span>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    {isOwner && !isCurrentUser ? (
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => handleRemoveMember(mem.id)}
                      >
                        Remove
                      </Button>
                    ) : (
                      <Button size="sm" isDisabled>
                        {isCurrentUser ? 'You' : 'Remove'}
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>

      {/* Pagination */}
      {(memberships.hasNextPage || memberships.hasPreviousPage) && (
        <div className="flex justify-center mt-4 gap-2">
          <Button
            disabled={!memberships.hasPreviousPage}
            onClick={() => memberships.fetchPrevious()}
          >
            Previous
          </Button>
          <Button
            disabled={!memberships.hasNextPage}
            onClick={() => memberships.fetchNext()}
          >
            Next
          </Button>
        </div>
      )}

      {/* Invite Member Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          <ModalHeader>Invite Team Member</ModalHeader>
          <ModalBody>
            <form onSubmit={handleInviteMember}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="colleague@example.com"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role
                </label>
                <Select
                  className="w-full"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  isDisabled={isLoadingRoles}
                >
                  {roles.map((r) => (
                    <SelectItem key={r.key} value={r.key}>
                      {r.name || r.key.replace('org:', '')}
                    </SelectItem>
                  ))}
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  Select the appropriate role for this team member
                </p>
              </div>

              {inviteMessage.text && (
                <div
                  className={`p-3 rounded-md mb-4 ${
                    inviteMessage.type === 'error'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-green-100 text-green-800'
                  }`}
                >
                  {inviteMessage.text}
                </div>
              )}
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="default" variant="light" onClick={onClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              onClick={handleInviteMember}
              disabled={isInviting || !email}
              style={{
                backgroundColor: 'var(--primary-color, #2563EB)',
                color: '#FFFFFF',
              }}
            >
              {isInviting ? <Spinner size="sm" /> : 'Send Invitation'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
