import * as pulumi from '@pulumi/pulumi';
import * as dockerBuild from '@pulumi/docker-build';

const config = new pulumi.Config();
const imageName = config.get('imageName') ?? 'expense-tracker-api';
const imageTag = config.get('imageTag') ?? 'latest';

const ghcrRegistry = `ghcr.io/cheunjm/${imageName}`;

const apiImage = new dockerBuild.Image('api-image', {
  tags: [
    `${ghcrRegistry}:${imageTag}`,
    `${ghcrRegistry}:latest`,
  ],
  context: {
    location: '../packages/api',
  },
  dockerfile: {
    location: '../packages/api/Dockerfile',
  },
  platforms: [dockerBuild.Platform.Linux_amd64],
  push: true,
  registries: [
    {
      address: 'ghcr.io',
      username: config.get('ghcrUsername') ?? 'cheunjm',
      password: config.requireSecret('ghcrToken'),
    },
  ],
});

export const apiImageRef = apiImage.ref;
export const apiImageDigest = apiImage.digest;
