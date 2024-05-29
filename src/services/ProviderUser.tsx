import React from 'react';
import { useLocalStorage } from '@mantine/hooks';
import { Avatar } from '@mantine/core';

interface ProviderUserProps {
  name: string;
}

function getInitials(name: string): string {
  const words = name.split(' ');
  const initials = words.slice(0, 2).map(word => word[0]).join('');
  return initials.toUpperCase();
}

function getRandomColor(): string {
  const colors = [
    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'teal', 'lime'
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

const ProviderUser: React.FC<ProviderUserProps> = ({ name }) => {
  const [color, _] = useLocalStorage({
    key: `avatar-color`,
    defaultValue: getRandomColor(),
  });

  const initials = getInitials(name);

  return (
    <Avatar src={null} alt={name} color={color}>
      {initials}
    </Avatar>
  );
};

export default ProviderUser;