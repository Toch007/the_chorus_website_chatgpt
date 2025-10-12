// lib/emailTemplates.ts
interface EmailTemplate {
  subject: string;
  getHtml: (name: string, additionalData?: any) => string;
}

export const emailTemplates: Record<string, EmailTemplate> = {
  choir: {
    subject: "Application Received - The Chorus Abuja Choir Auditions",
    getHtml: (name: string, additionalData?: any) => {
      const voicePart = additionalData?.voicePart;
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #3B82F6, #8B5CF6); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px 20px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .highlight { background: #EBF8FF; padding: 20px; border-left: 4px solid #3B82F6; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .next-steps { background: #F0FDF4; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .contact-info { background: #FEF7FF; padding: 15px; border-radius: 8px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🎵 The Chorus Abuja</div>
              <h1>Application Received Successfully!</h1>
            </div>
            
            <div class="content">
              <p>Dear <strong>${name}</strong>,</p>
              
              <p>Thank you for your interest in joining The Chorus Abuja as a choir member${voicePart ? ` in the <strong>${voicePart}</strong> section` : ''}! We have successfully received your application.</p>
              
              <div class="highlight">
                <h3>📋 What Happens Next?</h3>
                <p>We are excited to inform you that <strong>The Chorus Abuja accepts new members twice every year</strong>. Your application will be reviewed, and if selected, you will be contacted for auditions.</p>
              </div>
              
              <div class="next-steps">
                <h3>🎤 Audition Process</h3>
                <ul>
                  <li><strong>Review Period:</strong> Our team will carefully review your application</li>
                  <li><strong>Audition Invitation:</strong> Selected candidates will be contacted with audition details</li>
                  <li><strong>Time & Venue:</strong> Specific audition time and venue will be communicated to you directly</li>
                  <li><strong>What to Expect:</strong> Voice assessment, basic music knowledge, and a brief interview</li>
                </ul>
              </div>
              
              <div class="contact-info">
                <h3>📞 Need Assistance?</h3>
                <p>If you have any questions about your application or the audition process, please don't hesitate to contact us:</p>
                <ul>
                  <li><strong>Email:</strong> info@thechorusabuja.org</li>
                  <li><strong>WhatsApp:</strong> +234 803 215 7688</li>
                </ul>
              </div>
              
              <p>We appreciate your patience during our review process and look forward to potentially welcoming you to our musical family!</p>
              
              <p style="margin-top: 30px;">
                Warm regards,<br>
                <strong>The Admissions Team</strong><br>
                The Chorus Abuja
              </p>
            </div>
            
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>Follow us on social media: Instagram | Facebook | Twitter</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }
  },

  volunteer: {
    subject: "Application Received - The Chorus Abuja Volunteer Program",
    getHtml: (name: string) => `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #10B981, #3B82F6); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #ffffff; padding: 30px 20px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .highlight { background: #ECFDF5; padding: 20px; border-left: 4px solid #10B981; margin: 20px 0; border-radius: 5px; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
          .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
          .next-steps { background: #FEF7FF; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .contact-info { background: #EBF8FF; padding: 15px; border-radius: 8px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="logo">🤝 The Chorus Abuja</div>
            <h1>Volunteer Application Received!</h1>
          </div>
          
          <div class="content">
            <p>Dear <strong>${name}</strong>,</p>
            
            <p>Thank you for your generous heart and interest in volunteering with The Chorus Abuja! We have successfully received your volunteer application.</p>
            
            <div class="highlight">
              <h3>💝 Your Impact Matters</h3>
              <p>Volunteers are the backbone of our organization, helping us create memorable experiences and touch lives through music. We truly appreciate your willingness to serve!</p>
            </div>
            
            <div class="next-steps">
              <h3>📋 What Happens Next?</h3>
              <ul>
                <li><strong>Application Review:</strong> Our volunteer coordinator will review your application and interests</li>
                <li><strong>Contact Timeline:</strong> You will be contacted within the next few weeks</li>
                <li><strong>Orientation:</strong> Selected volunteers will be invited for a brief orientation session</li>
                <li><strong>Assignment:</strong> You'll be matched with volunteer opportunities that align with your skills and availability</li>
              </ul>
            </div>
            
            <div class="contact-info">
              <h3>📞 Questions?</h3>
              <p>If you have any questions about your volunteer application, please contact our volunteer coordinator:</p>
              <ul>
                <li><strong>Email:</strong> volunteers@thechorusabuja.org</li>
                <li><strong>WhatsApp:</strong> +234 803 215 7688</li>
              </ul>
            </div>
            
            <p>Thank you once again for your heart to serve. We look forward to working together to spread joy through music!</p>
            
            <p style="margin-top: 30px;">
              With gratitude,<br>
              <strong>The Volunteer Team</strong><br>
              The Chorus Abuja
            </p>
          </div>
          
          <div class="footer">
            <p>This is an automated message. Please do not reply to this email.</p>
            <p>Follow us on social media: Instagram | Facebook | Twitter</p>
          </div>
        </div>
      </body>
      </html>
    `
  },

  media: {
    subject: "Application Received - The Chorus Abuja Media & Creative Team",
    getHtml: (name: string, additionalData?: any) => {
      const skills = additionalData?.skills || [];
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #8B5CF6, #EC4899); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px 20px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .highlight { background: #FEF7FF; padding: 20px; border-left: 4px solid #8B5CF6; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .next-steps { background: #FFFBEB; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .contact-info { background: #EBF8FF; padding: 15px; border-radius: 8px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">📸 The Chorus Abuja</div>
              <h1>Media Team Application Received!</h1>
            </div>
            
            <div class="content">
              <p>Dear <strong>${name}</strong>,</p>
              
              <p>Thank you for your interest in joining The Chorus Abuja Media & Creative Team! We have successfully received your application${skills.length > 0 ? ` showcasing your skills in <strong>${skills.join(', ')}</strong>` : ''}.</p>
              
              <div class="highlight">
                <h3>🎨 Creative Excellence</h3>
                <p>Our Media & Creative Team plays a crucial role in capturing and sharing the beauty of our musical journey. Your creative talents will help us inspire and connect with audiences worldwide!</p>
              </div>
              
              <div class="next-steps">
                <h3>📋 What Happens Next?</h3>
                <ul>
                  <li><strong>Portfolio Review:</strong> Our creative director will review your application and portfolio</li>
                  <li><strong>Skills Assessment:</strong> We'll evaluate how your skills align with our current needs</li>
                  <li><strong>Interview Process:</strong> Selected candidates will be contacted for a creative interview</li>
                  <li><strong>Team Integration:</strong> Successful applicants will be welcomed into our creative family</li>
                </ul>
              </div>
              
              <div class="contact-info">
                <h3>📞 Questions About Your Application?</h3>
                <p>If you have any questions about your media team application, please contact our creative team:</p>
                <ul>
                  <li><strong>Email:</strong> media@thechorusabuja.org</li>
                  <li><strong>WhatsApp:</strong> +234 803 215 7688</li>
                </ul>
              </div>
              
              <p>We're excited about the possibility of your creative vision becoming part of our story. Thank you for wanting to help us share our music with the world!</p>
              
              <p style="margin-top: 30px;">
                Creatively yours,<br>
                <strong>The Media & Creative Team</strong><br>
                The Chorus Abuja
              </p>
            </div>
            
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>Follow us on social media: Instagram | Facebook | Twitter</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }
  },

  tech: {
    subject: "Application Received - The Chorus Abuja Tech & Logistics Team",
    getHtml: (name: string, additionalData?: any) => {
      const skills = additionalData?.skills || [];
      return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #059669, #0D9488); color: white; padding: 30px 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #ffffff; padding: 30px 20px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .highlight { background: #ECFDF5; padding: 20px; border-left: 4px solid #059669; margin: 20px 0; border-radius: 5px; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
            .logo { font-size: 24px; font-weight: bold; margin-bottom: 10px; }
            .next-steps { background: #FEF7FF; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .contact-info { background: #EBF8FF; padding: 15px; border-radius: 8px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">⚙️ The Chorus Abuja</div>
              <h1>Tech Team Application Received!</h1>
            </div>
            
            <div class="content">
              <p>Dear <strong>${name}</strong>,</p>
              
              <p>Thank you for your interest in joining The Chorus Abuja Tech & Logistics Team! We have successfully received your application${skills.length > 0 ? ` highlighting your expertise in <strong>${skills.join(', ')}</strong>` : ''}.</p>
              
              <div class="highlight">
                <h3>🔧 Behind Every Great Performance</h3>
                <p>Our Tech & Logistics Team ensures that every performance runs seamlessly. Your technical expertise and logistical support make our musical magic possible!</p>
              </div>
              
              <div class="next-steps">
                <h3>📋 What Happens Next?</h3>
                <ul>
                  <li><strong>Technical Review:</strong> Our technical director will review your skills and experience</li>
                  <li><strong>Needs Assessment:</strong> We'll evaluate how your expertise matches our current technical needs</li>
                  <li><strong>Practical Interview:</strong> Selected candidates may be invited for a hands-on technical assessment</li>
                  <li><strong>Team Onboarding:</strong> Successful applicants will be integrated into our technical operations</li>
                </ul>
              </div>
              
              <div class="contact-info">
                <h3>📞 Technical Support & Questions</h3>
                <p>If you have any questions about your tech team application, please contact our technical coordinator:</p>
                <ul>
                  <li><strong>Email:</strong> tech@thechorusabuja.org</li>
                  <li><strong>WhatsApp:</strong> +234 803 215 7688</li>
                </ul>
              </div>
              
              <p>We appreciate your willingness to support our mission through your technical skills. Thank you for helping us create unforgettable musical experiences!</p>
              
              <p style="margin-top: 30px;">
                Technically yours,<br>
                <strong>The Tech & Logistics Team</strong><br>
                The Chorus Abuja
              </p>
            </div>
            
            <div class="footer">
              <p>This is an automated message. Please do not reply to this email.</p>
              <p>Follow us on social media: Instagram | Facebook | Twitter</p>
            </div>
          </div>
        </body>
        </html>
      `;
    }
  }
};

export type EmailTemplateType = keyof typeof emailTemplates;