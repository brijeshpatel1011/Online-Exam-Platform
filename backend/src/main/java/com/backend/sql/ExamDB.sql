USE [ExamDB]
GO
/****** Object:  Table [dbo].[candidate]    Script Date: 21-11-2024 22:59:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[candidate](
	[c_id] [bigint] IDENTITY(1,1) NOT NULL,
	[birthdate] [date] NULL,
	[college] [varchar](255) NULL,
	[email] [varchar](255) NULL,
	[name] [varchar](255) NULL,
	[password] [varchar](255) NULL,
	[phone] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[c_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[exam]    Script Date: 21-11-2024 22:59:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[exam](
	[exam_id] [int] IDENTITY(1,1) NOT NULL,
	[college] [varchar](200) NULL,
	[description] [varchar](255) NULL,
	[duration] [int] NOT NULL,
	[exam_end_date] [date] NULL,
	[exam_end_time] [time](7) NULL,
	[exam_start_date] [date] NULL,
	[exam_start_time] [time](7) NULL,
	[passing_score] [int] NULL,
	[title] [varchar](255) NOT NULL,
	[total_marks] [int] NULL,
	[total_questions] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[exam_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[exam_mcq]    Script Date: 21-11-2024 22:59:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[exam_mcq](
	[exam_id] [int] NOT NULL,
	[mcq_id] [bigint] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[exam_id] ASC,
	[mcq_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[examiner]    Script Date: 21-11-2024 22:59:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[examiner](
	[e_id] [bigint] IDENTITY(1,1) NOT NULL,
	[email] [varchar](255) NULL,
	[name] [varchar](255) NULL,
	[password] [varchar](255) NULL,
	[phone] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[e_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[mcq]    Script Date: 21-11-2024 22:59:17 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[mcq](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[correct_answer] [varchar](255) NOT NULL,
	[category] [varchar](255) NOT NULL,
	[optiona] [varchar](255) NOT NULL,
	[optionb] [varchar](255) NOT NULL,
	[optionc] [varchar](255) NOT NULL,
	[optiond] [varchar](255) NOT NULL,
	[question] [varchar](255) NOT NULL,
	[difficulty] [varchar](255) NULL,
	[marks] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[candidate] ON 
GO
INSERT [dbo].[candidate] ([c_id], [birthdate], [college], [email], [name], [password], [phone]) VALUES (9, CAST(N'2003-11-10' AS Date), N'BVM', N'brijesh@gmail.com', N'Brijesh Patel', N'$2a$10$j9PmCIkk64iHoqWhMhf8UuBpmk7PX1a1K0TxcoXigK5WBKSOG2Rk2', N'8347207838')
GO
INSERT [dbo].[candidate] ([c_id], [birthdate], [college], [email], [name], [password], [phone]) VALUES (11, CAST(N'2003-11-10' AS Date), N'LD', N'vaidik@gmail.com', N'Vaidik Patel', N'$2a$10$VdzHUojhTofEmYL5LPrQZeK/o8dP//nmQtzBnw81vVsgHSlUIF.eO', N'8888888888')
GO
INSERT [dbo].[candidate] ([c_id], [birthdate], [college], [email], [name], [password], [phone]) VALUES (12, CAST(N'2003-11-10' AS Date), N'LD', N'brijesh1@gmail.com', N'Brijesh Patel', N'$2a$10$/M./2RC.lGwX3l3db8/jzeDkMyc0yUZbKu8DNieLDFVyH/DfOjYgK', N'99999998')
GO
INSERT [dbo].[candidate] ([c_id], [birthdate], [college], [email], [name], [password], [phone]) VALUES (13, CAST(N'2003-11-05' AS Date), N'LD', N'rahul@gmail.com', N'Rahul Patel', N'$2a$10$zkUeiP2zXvrVcsM0YH4XXeYv5/a2iqSnRMqLLRq4gjBbCgsDpwaAu', N'9797979797')
GO
INSERT [dbo].[candidate] ([c_id], [birthdate], [college], [email], [name], [password], [phone]) VALUES (16, CAST(N'2000-05-25' AS Date), N'College C', N'alicejohnson@example.com', N'Alice Johnson', N'$2a$10$Z.YR7CvtOsFvQjM.uWuqs.Czk19x38G7aRCrafjUv7r7hg0l4.S4G', N'1122334455')
GO
INSERT [dbo].[candidate] ([c_id], [birthdate], [college], [email], [name], [password], [phone]) VALUES (17, CAST(N'2003-11-10' AS Date), N'College A', N'johndoe@example.com', N'John Doe', N'$2a$10$MeNiAD8NG2Ug07gmTjeEpej/pbR2W.f.qt60434KMkcrQPCiAJcKS', N'1234567890')
GO
SET IDENTITY_INSERT [dbo].[candidate] OFF
GO
SET IDENTITY_INSERT [dbo].[exam] ON 
GO
INSERT [dbo].[exam] ([exam_id], [college], [description], [duration], [exam_end_date], [exam_end_time], [exam_start_date], [exam_start_time], [passing_score], [title], [total_marks], [total_questions]) VALUES (1, N'BVM', N'Final exam for the spring semester.', 120, CAST(N'2024-12-01' AS Date), CAST(N'12:00:00' AS Time), CAST(N'2024-12-01' AS Date), CAST(N'10:00:00' AS Time), 35, N'Spring Semester Exam', 100, 50)
GO
INSERT [dbo].[exam] ([exam_id], [college], [description], [duration], [exam_end_date], [exam_end_time], [exam_start_date], [exam_start_time], [passing_score], [title], [total_marks], [total_questions]) VALUES (3, N'LD', N'Final Exam for the spring semester.', 120, CAST(N'2024-12-01' AS Date), CAST(N'12:00:00' AS Time), CAST(N'2024-12-01' AS Date), CAST(N'10:00:00' AS Time), 35, N'Spring Semester Exam', 100, 50)
GO
INSERT [dbo].[exam] ([exam_id], [college], [description], [duration], [exam_end_date], [exam_end_time], [exam_start_date], [exam_start_time], [passing_score], [title], [total_marks], [total_questions]) VALUES (5, N'BVM', N'Demo.', 15, CAST(N'2024-12-01' AS Date), CAST(N'10:15:00' AS Time), CAST(N'2024-12-01' AS Date), CAST(N'10:00:00' AS Time), 5, N'Demo Exam', 10, 10)
GO
INSERT [dbo].[exam] ([exam_id], [college], [description], [duration], [exam_end_date], [exam_end_time], [exam_start_date], [exam_start_time], [passing_score], [title], [total_marks], [total_questions]) VALUES (6, N'BVM', N'Demo.', 60, CAST(N'2024-12-01' AS Date), CAST(N'11:00:00' AS Time), CAST(N'2024-12-01' AS Date), CAST(N'10:00:00' AS Time), 5, N'Demo-Programming Exam', 10, 10)
GO
SET IDENTITY_INSERT [dbo].[exam] OFF
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (5, 12)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (5, 14)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (5, 19)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (5, 20)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (5, 21)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (5, 22)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (5, 24)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (5, 27)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (5, 28)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (5, 30)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (6, 12)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (6, 13)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (6, 15)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (6, 21)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (6, 23)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (6, 24)
GO
INSERT [dbo].[exam_mcq] ([exam_id], [mcq_id]) VALUES (6, 28)
GO
SET IDENTITY_INSERT [dbo].[examiner] ON 
GO
INSERT [dbo].[examiner] ([e_id], [email], [name], [password], [phone]) VALUES (2, N'admin@gmail.com', N'admin', N'$2a$10$8eadAqz.TitRcFu4oSC.duc8PiDxwiQgKM4ydd3aEzRhhMyJ7c2Tu', N'8347207838')
GO
SET IDENTITY_INSERT [dbo].[examiner] OFF
GO
SET IDENTITY_INSERT [dbo].[mcq] ON 
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (12, N'C', N'Logical', N'1024 bytes', N'512 bytes', N'1 kilobyte', N'1 megabyte', N'What is the size of a kilobyte?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (13, N'A', N'Logical', N'Binary', N'Hexadecimal', N'Decimal', N'Octal', N'What is the base of the binary number system?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (14, N'D', N'Logical', N'Variable', N'Constant', N'Function', N'Algorithm', N'What is a step-by-step procedure to solve a problem called?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (15, N'B', N'Logical', N'5', N'8', N'10', N'12', N'How many bits are in a byte?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (16, N'C', N'Logical', N'10 Mbps', N'100 Mbps', N'1 Gbps', N'10 Gbps', N'What is the speed of a standard Gigabit Ethernet connection?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (17, N'D', N'Technical', N'Operating System', N'Compiler', N'Database', N'Router', N'Which device is used to connect two networks?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (18, N'A', N'Technical', N'TCP/IP', N'UDP/IP', N'FTP', N'HTTP', N'Which protocol is used for communication over the internet?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (19, N'B', N'Technical', N'Windows', N'Linux', N'Unix', N'MacOS', N'Which operating system is open-source?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (20, N'C', N'Technical', N'Hard Disk', N'RAM', N'SSD', N'ROM', N'Which type of storage is faster?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (21, N'B', N'Technical', N'CPU', N'GPU', N'RAM', N'SSD', N'Which hardware component is specifically designed for rendering graphics?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (22, N'C', N'Programming', N'Integer', N'String', N'Boolean', N'Float', N'Which data type is used for true/false values?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (23, N'D', N'Programming', N'Static', N'Dynamic', N'Functional', N'Object-Oriented', N'What type of programming is Java primarily known for?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (24, N'A', N'Programming', N'Python', N'C', N'JavaScript', N'Java', N'Which programming language is interpreted and commonly used in data science?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (25, N'B', N'Programming', N'Switch', N'For', N'While', N'If', N'Which statement is used for looping in C programming?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (26, N'A', N'Programming', N'Encapsulation', N'Inheritance', N'Polymorphism', N'Abstraction', N'Which concept hides implementation details in OOP?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (27, N'C', N'Logical', N'HTML', N'CSS', N'JavaScript', N'Python', N'Which language is used to make web pages interactive?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (28, N'A', N'Technical', N'DNS', N'IP', N'MAC Address', N'Subnet Mask', N'What translates domain names to IP addresses?', N'Medium', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (29, N'D', N'Logical', N'32-bit', N'16-bit', N'128-bit', N'64-bit', N'What is the word size of a 64-bit processor?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (30, N'B', N'Programming', N'GitHub', N'Git', N'BitBucket', N'SourceForge', N'Which version control system uses commands like commit, push, pull?', N'Easy', 1)
GO
INSERT [dbo].[mcq] ([id], [correct_answer], [category], [optiona], [optionb], [optionc], [optiond], [question], [difficulty], [marks]) VALUES (31, N'C', N'Logical', N'Compile Time', N'Run Time', N'Both', N'None', N'When is polymorphism determined in Java?', N'Medium', 1)
GO
SET IDENTITY_INSERT [dbo].[mcq] OFF
GO
ALTER TABLE [dbo].[mcq] ADD  DEFAULT ((1)) FOR [marks]
GO
ALTER TABLE [dbo].[exam_mcq]  WITH CHECK ADD  CONSTRAINT [FK77x0qhl184755pktctqobbpoj] FOREIGN KEY([mcq_id])
REFERENCES [dbo].[mcq] ([id])
GO
ALTER TABLE [dbo].[exam_mcq] CHECK CONSTRAINT [FK77x0qhl184755pktctqobbpoj]
GO
ALTER TABLE [dbo].[exam_mcq]  WITH CHECK ADD  CONSTRAINT [FKg6115v55ag87qu9l47vrw3618] FOREIGN KEY([exam_id])
REFERENCES [dbo].[exam] ([exam_id])
GO
ALTER TABLE [dbo].[exam_mcq] CHECK CONSTRAINT [FKg6115v55ag87qu9l47vrw3618]
GO
