ENVIRONMENT=${1:-dev}
PREVIOUS_VERSION=$(curl -L http://${ENVIRONMENT}.velocia.io:3000 | grep -oi '.\<meta name="version" content=\(.*\)"' | cut -d'"' -f 4)
PREVIOUS_TAG=$(echo $PREVIOUS_VERSION |  grep -o -e 'v.[0-9\.]*')
PREVIOUS_COMMIT_HASH=$(echo $PREVIOUS_VERSION |  grep -o -e '-g[a-z0-9]*' | cut  -c 3-)
npm run build-${ENVIRONMENT}
aws s3 sync ./public/ s3://${ENVIRONMENT}-velocia-admin-portal/current/
aws s3 sync ./public/ s3://${ENVIRONMENT}-velocia-admin-portal/$(git describe)/
sleep 10
DEPLOYED_VERSION=$(curl -L http://${ENVIRONMENT}.velocia.io:8080 | grep -oi '.\<meta name="version" content=\(.*\)"' | cut -d'"' -f 4)
TARGET_STORIES=$(git log $PREVIOUS_COMMIT_HASH.. | grep -e 'VELO-[0-9]\{2,5\}' -o | sort -u)
PAYLOAD_DATA='{"blocks": [{"type": "section","text": {"type": "mrkdwn","text": "A deployment of :wrench: :wrench: *Admin* @ '${ENVIRONMENT}' was just executed \n '${PREVIOUS_VERSION}' -> *'${DEPLOYED_VERSION}'*"}}]}'
curl -X POST -H 'Content-type: application/json' --data "${PAYLOAD_DATA}" ${SLACK_DEPLOYMENT_WEBHOOK}