namespace Leaderboard.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class FirstNameLastName : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Athlete", "FirstName", c => c.String(maxLength: 4000));
            AddColumn("dbo.Athlete", "LastName", c => c.String(maxLength: 4000));
            DropColumn("dbo.Athlete", "Name");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Athlete", "Name", c => c.String(maxLength: 4000));
            DropColumn("dbo.Athlete", "LastName");
            DropColumn("dbo.Athlete", "FirstName");
        }
    }
}
