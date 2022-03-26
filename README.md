# Getting Started with Ternary.app

## Dependancies

## `yarn install`
 "bootstrap"



## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!



## Learn More



Teams
['dist', 'identity', 'ps', 'ingestion', 'ops', 'intl', 'stew']

Instance Types

General Purpose
Compute Optimized
Memory Optimized
Accelerated Computing
Storage Optimized
Instance Features

Ternary wants to help its customers identify instances which should be right-sized, for example by choosing a different instance type which better matches the nature of the workload. The right-sizing can be identified by comparing the CPU and memory usage to the provisioned amount of CPU over time. 

Develop a way to visualize the utilization data in a way which makes identifying candidates for right-sizing simple. Also, it should be possible to group the data by labels to identify patterns for instances that all fall into the same label groups.
Submission Guidelines

● Attach the source code as a zip or tarball in Greenhouse.
● Provide instructions for running the app locally on Linux (e.g. npm run dev.) Note any required
dependencies that must be installed.
● (Optional) Provide a docker build for automating the build process and distribution of the final
product.

https://ternary.app/quiz/instanceUsage.json
Utilization data def 
Data utilization refers to the continuous use of data in corporate activities to improve operational efficiency and productivity for the benefit of the business.

Instance Types:
https://aws.amazon.com/ec2/instance-types/

• For the purposes of simplifying things, we can assume that all of these instances fall into the t3 family of compute instances (eg. t3.micro, t3.medium. etc). This randomly generated dataset may not fit perfectly, so feel free to make assumptions where you feel appropriate.
• You can use this information any way you see fit!

Label Usage:

• The data set includes labels for TEAM and ENVIRONMENT. That information may prove useful when guiding the user towards decision making, and understanding trends / patterns.
• Example: In the first entity, we see that this particular compute instance is owned by the “dist” team, and runs on the “prod” environment.

Let me know if you have any other questions!

Please submit here:
https://app3.greenhouse.io/tests/127a8032e01c9c26bc46e704812ac60c?utm_medium=email&utm_source=TakeHomeTest

The main rule for rightsizing is something like:
 "I don't want to spend money on more resources than I need." But feel free to use any heuristics (like the 40% mem one) to avoid over-correcting... I'll leave that up to you.

In the case where there's a big skew between CPU and MEM, yeah, I'd just assume you need a large machine that can handle the load. In the real world, you would likely decide to select a High-Mem option, but I don't want to over complicate things for the purposes of this assignment.

If you want to solve it, there may be a way to call the users' attention to those cases so they're aware of the situation and can intervene with some human intelligence.
