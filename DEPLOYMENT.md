# NexusAI Deployment Guide

Complete guide to deploy NexusAI to production.

---

## Pre-Deployment Checklist

- [ ] Code is committed to Git
- [ ] All environment variables configured
- [ ] Database migrations tested locally
- [ ] SSL certificate obtained for HTTPS
- [ ] Backup of local database created
- [ ] `.env.local` file is NOT committed
- [ ] Security audit completed
- [ ] Load testing passed

---

## 1. Vercel Deployment (Recommended)

### Pros
- Zero-config deployment
- Automatic HTTPS
- Built-in database support
- Easy environment variables
- Automatic rollbacks

### Steps

1. **Connect Repository**

```bash
npm install -g vercel
vercel login
```

2. **Configure Project**

```bash
vercel link
```

3. **Set Environment Variables**

In Vercel Dashboard:

```
Settings → Environment Variables
```

Add all variables from `.env.example`:
- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GITHUB_ID`
- `GITHUB_SECRET`
- `OPENAI_API_KEY`

4. **Update OAuth Callbacks**

Update OAuth provider settings:

**Google:**
- Authorized JavaScript origins: `yourdomain.vercel.app`
- Authorized redirect URIs: `https://yourdomain.vercel.app/api/auth/callback/google`

**GitHub:**
- Authorization callback URL: `https://yourdomain.vercel.app/api/auth/callback/github`

5. **Deploy**

```bash
vercel --prod
```

6. **Setup Database (First Time Only)**

```bash
vercel env pull .env.local
npm run db:push
```

---

## 2. Docker Deployment

### Using Docker Compose

#### Prerequisites
- Docker 20.10+
- Docker Compose 2.0+

#### Steps

1. **Build Image**

```bash
docker build -t nexusai:latest .
```

2. **Create `.env` file**

```bash
cp .env.example .env
# Edit .env with production values
```

3. **Start Containers**

```bash
docker-compose up -d
```

4. **Initialize Database**

```bash
docker-compose exec nexusai npm run db:push
```

5. **View Logs**

```bash
docker-compose logs -f nexusai
```

6. **Stop Containers**

```bash
docker-compose down
```

---

## 3. Heroku Deployment

### Prerequisites
- Heroku CLI installed
- Heroku account

### Steps

1. **Login to Heroku**

```bash
heroku login
```

2. **Create App**

```bash
heroku create nexusai-production
```

3. **Add PostgreSQL**

```bash
heroku addons:create heroku-postgresql:standard-0 --app nexusai-production
```

4. **Set Environment Variables**

```bash
heroku config:set NEXTAUTH_SECRET="$(openssl rand -base64 32)" --app nexusai-production
heroku config:set NEXTAUTH_URL="https://nexusai-production.herokuapp.com" --app nexusai-production
heroku config:set GOOGLE_CLIENT_ID="..." --app nexusai-production
heroku config:set GOOGLE_CLIENT_SECRET="..." --app nexusai-production
# ... set other variables
```

5. **Deploy**

```bash
git push heroku main
```

6. **Initialize Database**

```bash
heroku run npm run db:push --app nexusai-production
```

7. **View Logs**

```bash
heroku logs --tail --app nexusai-production
```

---

## 4. AWS Deployment

### Using ECS (Elastic Container Service)

#### Prerequisites
- AWS Account
- AWS CLI configured
- Docker image pushed to ECR

#### Steps

1. **Create ECR Repository**

```bash
aws ecr create-repository --repository-name nexusai
```

2. **Build and Push Image**

```bash
# Get login token
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <account-id>.dkr.ecr.us-east-1.amazonaws.com

# Tag image
docker tag nexusai:latest <account-id>.dkr.ecr.us-east-1.amazonaws.com/nexusai:latest

# Push image
docker push <account-id>.dkr.ecr.us-east-1.amazonaws.com/nexusai:latest
```

3. **Create RDS PostgreSQL Database**

```bash
aws rds create-db-instance \
  --db-instance-identifier nexusai-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --allocated-storage 20 \
  --master-username admin \
  --master-user-password <strong-password>
```

4. **Create ECS Cluster**

```bash
aws ecs create-cluster --cluster-name nexusai-cluster
```

5. **Register Task Definition**

Create `task-definition.json`:

```json
{
  "family": "nexusai",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "256",
  "memory": "512",
  "containerDefinitions": [
    {
      "name": "nexusai",
      "image": "<account-id>.dkr.ecr.us-east-1.amazonaws.com/nexusai:latest",
      "portMappings": [
        {
          "containerPort": 3000,
          "hostPort": 3000,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NEXTAUTH_URL",
          "value": "https://yourdomain.com"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:account-id:secret:nexusai/db-url"
        }
      ]
    }
  ]
}
```

Register:

```bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
```

6. **Create Service**

```bash
aws ecs create-service \
  --cluster nexusai-cluster \
  --service-name nexusai \
  --task-definition nexusai:1 \
  --desired-count 2 \
  --launch-type FARGATE
```

---

## 5. Google Cloud Run

### Prerequisites
- Google Cloud Account
- Cloud SDK installed

### Steps

1. **Authenticate**

```bash
gcloud auth login
gcloud config set project <project-id>
```

2. **Create Cloud SQL Instance**

```bash
gcloud sql instances create nexusai-db \
  --database-version=POSTGRES_15 \
  --tier=db-f1-micro \
  --region=us-central1
```

3. **Deploy Application**

```bash
gcloud run deploy nexusai \
  --source . \
  --platform managed \
  --region us-central1 \
  --memory 512Mi \
  --cpu 1 \
  --set-env-vars DATABASE_URL="cloudsql://..." \
  --allow-unauthenticated
```

---

## 6. DigitalOcean Deployment

### Using Docker

1. **Create Droplet**

```bash
doctl compute droplet create nexusai \
  --region nyc3 \
  --size s-1vcpu-1gb \
  --image ubuntu-22-04-x64
```

2. **Connect via SSH**

```bash
ssh root@<droplet-ip>
```

3. **Install Docker**

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
docker --version
```

4. **Clone Repository**

```bash
git clone https://github.com/yourusername/nexusai.git
cd nexusai
```

5. **Setup Environment**

```bash
cp .env.example .env
nano .env  # Edit with production values
```

6. **Start Containers**

```bash
docker-compose up -d
```

---

## Production Checklist

### Security
- [ ] HTTPS enabled everywhere
- [ ] Environment variables secured
- [ ] Database backups enabled
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled
- [ ] CSRF tokens validated

### Performance
- [ ] CDN configured
- [ ] Database indexes optimized
- [ ] Caching implemented
- [ ] Image optimization enabled
- [ ] Code minification verified
- [ ] Database replication configured

### Monitoring
- [ ] Error tracking setup (Sentry)
- [ ] Performance monitoring (New Relic)
- [ ] Log aggregation (CloudWatch)
- [ ] Uptime monitoring (StatusPage)
- [ ] Database monitoring enabled
- [ ] Health checks configured

### Backup & Disaster Recovery
- [ ] Daily database backups
- [ ] Backup retention policy
- [ ] Restore testing completed
- [ ] Disaster recovery plan
- [ ] DNS failover configured

---

## Updating Production

### Rolling Deployment

```bash
# Build new image
docker build -t nexusai:v1.0.1 .

# Push to registry
docker push nexusai:v1.0.1

# Update service with zero downtime
docker service update --image nexusai:v1.0.1 nexusai
```

### Database Migrations

```bash
# Run migrations before deploying
npm run db:push

# Then deploy application
vercel --prod
```

---

## Troubleshooting

### Database Connection Issues

```bash
# Test connection
psql $DATABASE_URL -c "SELECT 1"

# View connection details
echo $DATABASE_URL
```

### High Memory Usage

```bash
# Check memory limits
docker stats

# Increase memory in deployment configuration
```

### Slow Queries

```bash
# Enable query logging
DEBUG=prisma:* npm run start

# Check database indexes
SELECT * FROM pg_stat_statements;
```

### SSL Certificate Issues

```bash
# Verify certificate
openssl s_client -connect yourdomain.com:443

# Renew certificate (if using Let's Encrypt)
certbot renew
```

---

## Monitoring & Maintenance

### Health Checks

```bash
curl https://yourdomain.com/api/health
```

### View Logs

**Vercel:**
```bash
vercel logs
```

**Heroku:**
```bash
heroku logs --tail
```

**Docker:**
```bash
docker-compose logs -f
```

### Database Backups

```bash
# Manual backup
pg_dump $DATABASE_URL > backup.sql

# Restore from backup
psql $DATABASE_URL < backup.sql
```

---

## Support

For deployment issues:

1. Check service provider documentation
2. Review error logs
3. Check database connectivity
4. Verify environment variables
5. Contact support team

---

**Last Updated:** 2024
